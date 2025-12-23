/**
 * Content Scraper for AI Training Data
 * 
 * Usage:
 *   node scripts/scraper.js <url1> [url2] [url3] ...
 * 
 * Example:
 *   node scripts/scraper.js https://linkedin.com/posts/... https://medium.com/@user/article
 * 
 * This script scrapes content from URLs and formats it for use in brand-knowledge.ts
 */

const https = require('https')
const http = require('http')
const { URL } = require('url')
const fs = require('fs')
const path = require('path')

// Configuration
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/**
 * Fetch HTML content from a URL
 */
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const protocol = urlObj.protocol === 'https:' ? https : http

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }

    const req = protocol.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data)
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.setTimeout(30000, () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })

    req.end()
  })
}

/**
 * Extract text content from HTML (basic implementation)
 * For better results, consider using cheerio or jsdom
 */
function extractText(html) {
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  
  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '')
  
  // Extract text from common content containers
  const contentSelectors = [
    /<article[^>]*>([\s\S]*?)<\/article>/gi,
    /<main[^>]*>([\s\S]*?)<\/main>/gi,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]*class="[^"]*article[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
  ]
  
  let content = ''
  for (const selector of contentSelectors) {
    const matches = html.match(selector)
    if (matches && matches.length > 0) {
      content = matches.join('\n\n')
      break
    }
  }
  
  // If no content container found, use body
  if (!content) {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    content = bodyMatch ? bodyMatch[1] : html
  }
  
  // Convert HTML to text
  text = content
    .replace(/<[^>]+>/g, ' ') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
  
  return text
}

/**
 * Extract title from HTML
 */
function extractTitle(html) {
  // Try <title> tag first
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  if (titleMatch) {
    return titleMatch[1].trim()
  }
  
  // Try <h1> tag
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
  if (h1Match) {
    return h1Match[1].trim()
  }
  
  // Try Open Graph title
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
  if (ogTitleMatch) {
    return ogTitleMatch[1].trim()
  }
  
  return 'Untitled'
}

/**
 * Determine source type from URL
 */
function getSourceType(url) {
  if (url.includes('linkedin.com')) return 'linkedin'
  if (url.includes('medium.com')) return 'blog'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'blog'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'talk'
  if (url.includes('github.com')) return 'website'
  return 'blog'
}

/**
 * Generate a unique ID from URL
 */
function generateId(url, index) {
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split('/').filter(Boolean)
  const lastPart = pathParts[pathParts.length - 1] || 'content'
  const cleanId = lastPart.replace(/[^a-z0-9-]/gi, '-').toLowerCase()
  return `${cleanId}-${index}`
}

/**
 * Format content for brand-knowledge.ts
 */
function formatForBrandKnowledge(url, content, title, sourceType, index) {
  const id = generateId(url, index)
  const date = new Date().toISOString().split('T')[0] // Current date as default
  
  // Truncate very long content (keep first 5000 chars)
  const truncatedContent = content.length > 5000 
    ? content.substring(0, 5000) + '\n\n[Content truncated - see original URL for full text]'
    : content
  
  return {
    id: id,
    source: sourceType,
    content: truncatedContent,
    metadata: {
      title: title,
      date: date,
      url: url,
      tags: [sourceType]
    }
  }
}

/**
 * Main scraper function
 */
async function scrapeURL(url, index) {
  try {
    console.log(`\n[${index}] Scraping: ${url}`)
    console.log('Fetching...')
    
    const html = await fetchURL(url)
    console.log('✓ Fetched successfully')
    
    const title = extractTitle(html)
    console.log(`✓ Title: ${title}`)
    
    const text = extractText(html)
    console.log(`✓ Extracted ${text.length} characters`)
    
    if (text.length < 100) {
      console.warn('⚠ Warning: Very little content extracted. The page might require JavaScript.')
    }
    
    const sourceType = getSourceType(url)
    const formatted = formatForBrandKnowledge(url, text, title, sourceType, index)
    
    return formatted
  } catch (error) {
    console.error(`✗ Error scraping ${url}:`, error.message)
    return null
  }
}

/**
 * Generate TypeScript code output
 */
function generateTypeScriptOutput(results) {
  const validResults = results.filter(r => r !== null)
  
  if (validResults.length === 0) {
    return '// No content scraped successfully'
  }
  
  let output = '// Scraped content - Copy this into brand-knowledge.ts\n'
  output += '// Generated: ' + new Date().toISOString() + '\n\n'
  
  validResults.forEach((result, index) => {
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
    output += `}${index < validResults.length - 1 ? ',' : ''}\n\n`
  })
  
  return output
}

/**
 * Main execution
 */
async function main() {
  const urls = process.argv.slice(2)
  
  if (urls.length === 0) {
    console.log('Usage: node scripts/scraper.js <url1> [url2] [url3] ...')
    console.log('\nExample:')
    console.log('  node scripts/scraper.js https://linkedin.com/posts/... https://medium.com/@user/article')
    process.exit(1)
  }
  
  console.log(`Scraping ${urls.length} URL(s)...\n`)
  
  const results = []
  for (let i = 0; i < urls.length; i++) {
    const result = await scrapeURL(urls[i], i + 1)
    results.push(result)
    
    // Small delay between requests to be respectful
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  const output = generateTypeScriptOutput(results)
  
  console.log('\n' + '='.repeat(80))
  console.log('SCRAPED CONTENT (TypeScript format)')
  console.log('='.repeat(80))
  console.log('\n' + output)
  console.log('='.repeat(80))
  
  // Also save to file for easy copying
  const outputDir = path.join(process.cwd(), 'scripts', 'scraped-content')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const outputFile = path.join(outputDir, `scraped-${timestamp}.ts`)
  fs.writeFileSync(outputFile, output, 'utf8')
  
  console.log(`\n💾 Output also saved to: ${outputFile}`)
  console.log(`   You can copy the content from there or from above.\n`)
  
  const successCount = results.filter(r => r !== null).length
  console.log(`✓ Successfully scraped ${successCount}/${urls.length} URLs`)
  
  if (successCount < urls.length) {
    console.log('⚠ Some URLs failed. Check error messages above.')
  }
  
  // Warn about LinkedIn authentication
  const linkedinUrls = urls.filter(url => url.includes('linkedin.com'))
  if (linkedinUrls.length > 0 && successCount > 0) {
    console.log('\n⚠ NOTE: LinkedIn requires authentication. If you see login pages,')
    console.log('   you may need to manually copy the content from your LinkedIn profile.')
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { scrapeURL, extractText, extractTitle }

