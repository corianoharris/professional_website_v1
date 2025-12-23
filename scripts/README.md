# Content Import Scripts

Scripts to help you import content from various sources (URLs, PDFs) and format it for use in the AI training data.

## Content Scraper (URLs)

## Usage

### Basic Usage

```bash
npm run scrape <url1> [url2] [url3] ...
```

Or directly:

```bash
node scripts/scraper.js <url1> [url2] [url3] ...
```

### Examples

```bash
# Scrape a single LinkedIn post
npm run scrape https://linkedin.com/posts/corianoharris_example-post-activity-123456789

# Scrape multiple URLs at once
npm run scrape \
  https://linkedin.com/posts/corianoharris_post1 \
  https://medium.com/@user/article \
  https://yourblog.com/post
```

## How It Works

1. **Fetches HTML** from the provided URLs
2. **Extracts text content** from the HTML
3. **Formats the output** as TypeScript code
4. **Outputs** formatted code you can copy into `lib/ai/brand-knowledge.ts`

## Supported Sites

The scraper works best with:
- ✅ Static HTML sites (blogs, articles)
- ✅ Medium articles
- ⚠️ LinkedIn (basic support - may need manual cleanup for JS-rendered content)
- ⚠️ Twitter/X (limited - content is often JavaScript-rendered)

## Output Format

The script outputs TypeScript code like this:

```typescript
{
  id: 'post-title-1',
  source: 'linkedin',
  content: `Scraped content text here...`,
  metadata: {
    title: 'Post Title',
    date: '2025-01-15',
    url: 'https://linkedin.com/...',
    tags: ['linkedin']
  }
}
```

## Adding Scraped Content to Training Data

1. Run the scraper:
   ```bash
   npm run scrape <your-urls>
   ```

2. Copy the output from the terminal

3. Paste it into the appropriate section in `lib/ai/brand-knowledge.ts`:
   - LinkedIn content → `linkedinContent` array
   - Blog posts → `brandKnowledgeBase` array (with `source: 'blog'`)
   - Research articles → `uxResearchContent` array

4. Review and clean up the content:
   - Remove any navigation text or ads that got scraped
   - Adjust the title if needed
   - Add relevant tags
   - Update the date if you know it

## Limitations

- **JavaScript-rendered content**: Some sites (like modern LinkedIn) render content with JavaScript. This basic scraper may not capture all content. For better results, consider using Puppeteer or Playwright.
- **Content length**: Content over 5000 characters is truncated. Check the original URL for full text.
- **Authentication**: Content behind login walls cannot be scraped.

## Improving the Scraper

For better results with JavaScript-rendered sites, you can:

1. **Use Puppeteer** (requires installation):
   ```bash
   npm install --save-dev puppeteer
   ```
   Then modify `scraper.js` to use Puppeteer for headless browser scraping.

2. **Use Playwright** (requires installation):
   ```bash
   npm install --save-dev playwright
   ```
   Similar to Puppeteer but supports multiple browsers.

3. **Use specialized scrapers**:
   - For LinkedIn: Use LinkedIn's API or manual copy-paste for best results
   - For Medium: The basic scraper works reasonably well

## Tips

- **Batch processing**: Add multiple URLs at once to save time
- **Review output**: Always review scraped content before adding to training data
- **Clean up**: Remove navigation, ads, and irrelevant content
- **Add context**: Include relevant tags and metadata
- **Test**: After adding content, test the AI chat to ensure it's using the new content

## PDF Extractor

Extract text from PDF files (like LinkedIn profile exports, resumes, etc.) and format them for the AI training data.

### Installation

First, install the required dependency:

```bash
npm install pdf-parse
# or
pnpm add pdf-parse
```

### Usage

```bash
npm run extract-pdf <path-to-pdf>
```

Or directly:

```bash
node scripts/pdf-extractor.js <path-to-pdf>
```

### Examples

```bash
# Extract from LinkedIn profile PDF
npm run extract-pdf ~/Downloads/linkedin-profile.pdf

# Extract from resume PDF
npm run extract-pdf ./documents/resume.pdf

# Use relative or absolute paths
npm run extract-pdf ./my-file.pdf
```

### How It Works

1. **Reads the PDF file** from the provided path
2. **Extracts text content** from all pages
3. **Detects source type** based on filename (linkedin, resume, talk, etc.)
4. **Formats the output** as TypeScript code
5. **Saves** formatted code to `scripts/scraped-content/` for easy copying

### Supported PDF Types

- ✅ Text-based PDFs (best results)
- ⚠️ Scanned PDFs (may need OCR - limited text extraction)

### Output Format

The script outputs TypeScript code like this:

```typescript
{
  id: 'linkedin-profile',
  source: 'linkedin',
  content: `Extracted text from PDF...`,
  metadata: {
    title: 'LinkedIn Profile',
    date: '2025-12-23',
    tags: ['linkedin', 'pdf']
  }
}
```

### Adding PDF Content to Training Data

1. Export your LinkedIn profile as PDF:
   - Go to LinkedIn → Settings → Data Privacy → Get a copy of your data
   - Or use LinkedIn's "Save to PDF" option if available

2. Run the extractor:
   ```bash
   npm run extract-pdf ~/Downloads/linkedin-profile.pdf
   ```

3. Copy the output from the terminal or the saved file

4. Paste it into the appropriate section in `lib/ai/brand-knowledge.ts`

5. Review and clean up:
   - Remove any page numbers or headers/footers
   - Adjust the title if needed
   - Add relevant tags
   - Update the date if you know it

### Tips for LinkedIn Profile PDFs

- **Best method**: Use LinkedIn's official data export feature
- **Alternative**: Save your profile page as PDF from browser (File → Print → Save as PDF)
- The extractor will automatically detect it's a LinkedIn profile based on the filename
- Review the extracted content and remove any navigation or UI elements that got included

## Troubleshooting

### "Request timeout" error
- The site may be slow to respond
- Try again, or the site may be blocking requests

### "Very little content extracted" warning
- The site likely uses JavaScript rendering
- Consider using Puppeteer/Playwright for better results
- Or manually copy the content from the page

### HTTP 403/401 errors
- The site may be blocking automated requests
- Try using a different User-Agent or adding delays
- Some sites require authentication (can't be scraped)

