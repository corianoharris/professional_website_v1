# AI Chat Setup Guide

This guide will help you set up the AI chat feature trained on your resume, LinkedIn, and talks.

## Overview

The AI chat uses **RAG (Retrieval Augmented Generation)** with Hugging Face models:
- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2` (for finding relevant content)
- **Chat Model**: `meta-llama/Llama-3.1-8B-Instruct` (for generating responses)
  
  You can customize the model by setting `HUGGINGFACE_CHAT_MODEL` in your `.env.local` file.
  
  Alternative models that work well:
  - `mistralai/Mistral-7B-Instruct-v0.3` - Newer Mistral model
  - `meta-llama/Llama-3.1-8B-Instruct` - Good free tier support
  - `HuggingFaceH4/zephyr-7b-beta` - Requires Inference Endpoint deployment

## Step 1: Get Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account (free)
3. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Create a new token with "Read" permissions
5. Copy the token

## Step 2: Add API Key to Environment

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Hugging Face API key to `.env.local`:
   ```env
   HUGGINGFACE_API_KEY=hf_your_token_here
   
   # Optional: Customize the chat model (default: meta-llama/Llama-3.1-8B-Instruct)
   # HUGGINGFACE_CHAT_MODEL=mistralai/Mistral-7B-Instruct-v0.3
   
   # Optional: Use a deployed Inference Endpoint instead of model name
   # HUGGINGFACE_INFERENCE_ENDPOINT=https://your-endpoint-url-here
   ```

## Step 3: Add Your Brand Data

Edit `lib/ai/brand-knowledge.ts` and add your content:

### Add Your Resume

```typescript
{
  id: 'resume-1',
  source: 'resume',
  content: `Your full resume text here...`,
  metadata: {
    title: 'Professional Resume',
    tags: ['expertise', 'achievements', 'services']
  }
}
```

### Add LinkedIn Content

```typescript
export const linkedinContent: BrandKnowledge[] = [
  {
    id: 'linkedin-1',
    source: 'linkedin',
    content: 'Your LinkedIn post or article content...',
    metadata: {
      title: 'LinkedIn Post Title',
      date: '2024-01-15',
      url: 'https://linkedin.com/posts/...',
      tags: ['thought-leadership', 'color-psychology']
    }
  },
  // Add more LinkedIn content...
]
```

### Add Talk Content

```typescript
export const talkContent: BrandKnowledge[] = [
  {
    id: 'talk-1',
    source: 'talk',
    content: `Talk transcript or detailed summary...
    
    Key points:
    - Point 1
    - Point 2
    - Point 3`,
    metadata: {
      title: 'Color Psychology in Modern Interfaces',
      date: '2025-01-15',
      url: 'https://youtube.com/watch?v=...',
      type: 'Virtual',
      tags: ['color', 'psychology', 'interfaces']
    }
  },
  // Add more talks...
]
```

## Step 4: Test the Chat

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open your site and click the chat button (bottom right)

3. Try asking:
   - "Tell me about your color strategy approach"
   - "What case studies do you have?"
   - "How do you help teams increase revenue?"

## Cost Considerations

### Hugging Face Free Tier
- **Embeddings**: Free (unlimited)
- **Chat API**: Free tier has rate limits
- **Recommendation**: Start with free tier, upgrade if needed

### Paid Options
- **Hugging Face Pro**: $9/month (higher rate limits)
- **Self-hosted**: Free but requires infrastructure

## Alternative: Self-Hosted Models

If you want to avoid API costs, you can self-host models:

1. Use `@huggingface/inference` package
2. Deploy models on your own infrastructure
3. Update `rag-pipeline.ts` to use local endpoints

## Updating Your Knowledge Base

To add new content:

1. Add new entries to `brand-knowledge.ts`
2. The embeddings will be generated automatically on first use
3. Consider pre-computing embeddings for faster responses

## Troubleshooting

### "HF API error" messages
- Check your API key is correct
- Verify the model is available (first request may take time to load)
- Check Hugging Face status page

### Slow responses
- First request is slower (model loading)
- Subsequent requests are faster
- Consider pre-warming the API

### Poor quality responses
- Add more detailed content to `brand-knowledge.ts`
- Include more context in your knowledge entries
- Try a different model (update `HF_CHAT_MODEL` in `.env.local`)

## Privacy & Security

- Your brand data stays in your codebase (not sent to training)
- Only query text is sent to Hugging Face API
- Consider self-hosting for complete privacy

## Next Steps

1. ✅ Add your resume content
2. ✅ Add LinkedIn posts/articles
3. ✅ Add talk transcripts
4. ✅ Test with real questions
5. ✅ Customize the system prompt in `rag-pipeline.ts`
6. ✅ Add more case studies and examples

## Support

If you need help:
- Check Hugging Face [documentation](https://huggingface.co/docs)
- Review the code comments in `rag-pipeline.ts`
- Test with simple queries first

