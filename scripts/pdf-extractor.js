/**
 * PDF Extractor for AI Training Data
 * 
 * Usage:
 *   node scripts/pdf-extractor.js <path-to-pdf>
 * 
 * Example:
 *   node scripts/pdf-extractor.js ~/Downloads/linkedin-profile.pdf
 * 
 * This script extracts text from PDF files and formats it for use in brand-knowledge.ts
 */

const fs = require('fs')
const path = require('path')

// Try to use pdf-parse if available, otherwise show instructions
let PDFParse
try {
  const pdfParseModule = require('pdf-parse')
  // pdf-parse v2.x uses PDFParse class
  if (pdfParseModule.PDFParse) {
    PDFParse = pdfParseModule.PDFParse
  } else if (typeof pdfParseModule === 'function') {
    // v1.x - direct function export (backward compatibility wrapper)
    PDFParse = class {
      constructor(options) {
        this.buffer = options.data || options
      }
      async getText() {
        const pdfParse = pdfParseModule
        const data = await pdfParse(this.buffer)
        return { text: data.text, total: data.numpages }
      }
    }
  } else {
    throw new Error('pdf-parse module format not recognized')
  }
} catch (error) {
  console.error('❌ pdf-parse is not installed.')
  console.log('\n📦 To use PDF extraction, install pdf-parse first:')
  console.log('   npm install pdf-parse')
  console.log('   # or')
  console.log('   pnpm add pdf-parse')
  console.log('\nAlternatively, you can manually copy text from your PDF and paste it into brand-knowledge.ts')
  process.exit(1)
}

/**
 * Generate a unique ID from filename
 */
function generateId(filePath) {
  const filename = path.basename(filePath, path.extname(filePath))
  const cleanId = filename.toLowerCase()
    .replace(/[^a-z0-9-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return cleanId || 'pdf-content'
}

/**
 * Determine source type from filename or content
 */
function getSourceType(filePath, content) {
  const filename = path.basename(filePath).toLowerCase()
  
  if (filename.includes('linkedin') || filename.includes('profile')) {
    return 'linkedin'
  }
  if (filename.includes('resume') || filename.includes('cv')) {
    return 'resume'
  }
  if (filename.includes('talk') || filename.includes('speech') || filename.includes('transcript')) {
    return 'talk'
  }
  if (filename.includes('research') || filename.includes('study')) {
    return 'case-study'
  }
  
  return 'website'
}

/**
 * Extract title from content (first line or heading)
 */
function extractTitle(content) {
  // Try to find a title in the first few lines
  const lines = content.split('\n').filter(line => line.trim().length > 0)
  
  if (lines.length > 0) {
    const firstLine = lines[0].trim()
    // If first line is short and looks like a title, use it
    if (firstLine.length < 100 && !firstLine.match(/^\d/)) {
      return firstLine
    }
  }
  
  // Otherwise, use filename
  return 'PDF Document'
}

/**
 * Format content for brand-knowledge.ts
 */
function formatForBrandKnowledge(filePath, content, title, sourceType) {
  const id = generateId(filePath)
  const date = new Date().toISOString().split('T')[0]
  
  // Clean up the content
  let cleanedContent = content
    .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
    .replace(/[ \t]+/g, ' ') // Normalize whitespace
    .trim()
  
  // Truncate very long content (keep first 10000 chars)
  if (cleanedContent.length > 10000) {
    cleanedContent = cleanedContent.substring(0, 10000) + '\n\n[Content truncated - see original PDF for full text]'
  }
  
  return {
    id: id,
    source: sourceType,
    content: cleanedContent,
    metadata: {
      title: title,
      date: date,
      tags: [sourceType, 'pdf']
    }
  }
}

/**
 * Extract text from PDF
 */
async function extractFromPDF(filePath) {
  try {
    console.log(`\n📄 Extracting text from: ${filePath}`)
    console.log('Reading PDF...')
    
    const dataBuffer = fs.readFileSync(filePath)
    // pdf-parse v2.x uses PDFParse class with getText() method
    const parser = new PDFParse({ data: dataBuffer })
    const data = await parser.getText()
    
    console.log(`✓ Extracted ${data.text.length} characters`)
    console.log(`✓ PDF has ${data.total} pages`)
    
    if (data.text.length < 100) {
      console.warn('⚠ Warning: Very little text extracted. The PDF might be scanned images.')
      console.warn('   Consider using OCR (Optical Character Recognition) for scanned PDFs.')
    }
    
    const sourceType = getSourceType(filePath, data.text)
    const title = extractTitle(data.text)
    
    console.log(`✓ Detected source type: ${sourceType}`)
    console.log(`✓ Title: ${title}`)
    
    const formatted = formatForBrandKnowledge(filePath, data.text, title, sourceType)
    
    return formatted
  } catch (error) {
    console.error(`✗ Error extracting PDF:`, error.message)
    throw error
  }
}

/**
 * Generate TypeScript code output
 */
function generateTypeScriptOutput(result) {
  if (!result) {
    return '// No content extracted'
  }
  
  let output = '// Extracted from PDF - Copy this into brand-knowledge.ts\n'
  output += `// Source file: ${result.metadata.url || 'PDF file'}\n`
  output += '// Generated: ' + new Date().toISOString() + '\n\n'
  
  output += `{\n`
  output += `  id: '${result.id}',\n`
  output += `  source: '${result.source}',\n`
  output += `  content: \`${result.content.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`,\n`
  output += `  metadata: {\n`
  if (result.metadata.title) {
    output += `    title: '${result.metadata.title.replace(/'/g, "\\'")}',\n`
  }
  if (result.metadata.date) {
    output += `    date: '${result.metadata.date}',\n`
  }
  if (result.metadata.url) {
    output += `    url: '${result.metadata.url}',\n`
  }
  if (result.metadata.tags && result.metadata.tags.length > 0) {
    output += `    tags: [${result.metadata.tags.map(t => `'${t}'`).join(', ')}],\n`
  }
  output += `  }\n`
  output += `}\n`
  
  return output
}

/**
 * Main execution
 */
async function main() {
  const filePath = process.argv[2]
  
  if (!filePath) {
    console.log('Usage: node scripts/pdf-extractor.js <path-to-pdf>')
    console.log('\nExample:')
    console.log('  node scripts/pdf-extractor.js ~/Downloads/linkedin-profile.pdf')
    console.log('  node scripts/pdf-extractor.js ./documents/resume.pdf')
    process.exit(1)
  }
  
  // Resolve file path
  const resolvedPath = path.isAbsolute(filePath) 
    ? filePath 
    : path.resolve(process.cwd(), filePath)
  
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ File not found: ${resolvedPath}`)
    process.exit(1)
  }
  
  if (!resolvedPath.toLowerCase().endsWith('.pdf')) {
    console.error(`❌ File is not a PDF: ${resolvedPath}`)
    process.exit(1)
  }
  
  try {
    const result = await extractFromPDF(resolvedPath)
    
    const output = generateTypeScriptOutput(result)
    
    console.log('\n' + '='.repeat(80))
    console.log('EXTRACTED CONTENT (TypeScript format)')
    console.log('='.repeat(80))
    console.log('\n' + output)
    console.log('='.repeat(80))
    
    // Also save to file for easy copying
    const outputDir = path.join(process.cwd(), 'scripts', 'scraped-content')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const outputFile = path.join(outputDir, `pdf-extracted-${timestamp}.ts`)
    fs.writeFileSync(outputFile, output, 'utf8')
    
    console.log(`\n💾 Output also saved to: ${outputFile}`)
    console.log(`   You can copy the content from there or from above.\n`)
    
    console.log(`✓ Successfully extracted PDF content`)
    
  } catch (error) {
    console.error('\n✗ Failed to extract PDF:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { extractFromPDF, formatForBrandKnowledge }

