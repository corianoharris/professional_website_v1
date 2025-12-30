"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react"
import { Button } from "./ui/button"

interface CollapsibleCodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CollapsibleCodeBlock({ code, language = "typescript", title }: CollapsibleCodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Count lines to determine if we should show collapse/expand
  const lineCount = code.split("\n").length
  const shouldCollapse = lineCount > 10 // Collapse by default if more than 10 lines

  // If collapsed by default and not expanded, show preview
  const displayCode = !shouldCollapse || isExpanded 
    ? code 
    : code.split("\n").slice(0, 5).join("\n") + "\n// ... (click to expand)"

  return (
    <div className="my-8 rounded-lg border border-black/10 bg-black/5 overflow-hidden" style={{ isolation: 'isolate' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/10 border-b border-black/10">
        <div className="flex items-center gap-3">
          {title && (
            <span className="text-sm font-semibold text-black">{title}</span>
          )}
          {language && (
            <span className="text-xs uppercase tracking-wider text-black/60 font-medium">
              {language}
            </span>
          )}
          {shouldCollapse && (
            <span className="text-xs text-black/50">
              {lineCount} lines
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2 text-black/70 hover:text-black hover:bg-black/10"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          {shouldCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 px-2 text-black/70 hover:text-black hover:bg-black/10"
              aria-label={isExpanded ? "Collapse code" : "Expand code"}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Code content */}
      <div className="relative">
        <pre className="p-4 md:p-6 overflow-x-auto bg-black/5" style={{ position: 'relative', isolation: 'isolate' }}>
          <code 
            className={`text-sm md:text-base leading-relaxed font-mono text-black`}
            style={{ 
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              whiteSpace: 'pre',
            }}
          >
            {displayCode.split("\n").map((line, index) => {
              // Handle empty lines
              if (!line.trim()) {
                return <div key={index} className="h-4" />
              }

              // Handle comments (single line)
              const commentMatch = line.match(/^(\s*)(\/\/\s*)(.+)$/)
              if (commentMatch) {
                const [, indent, commentPrefix, commentText] = commentMatch
                return (
                  <div key={index} className="flex">
                    <span className="text-black/40 select-none">{indent}</span>
                    <span className="text-[#6a737d]">{commentPrefix}</span>
                    <span className="text-[#6a737d] italic">{commentText}</span>
                  </div>
                )
              }

              // Handle strings with quotes
              const stringRegex = /(['"])((?:\\.|(?!\1)[^\\])*?)\1/g
              let processedLine = line
              const parts: Array<{ text: string; type: 'string' | 'keyword' | 'normal' }> = []
              let lastIndex = 0
              let match

              // Find all strings
              const stringMatches: Array<{ start: number; end: number; content: string; quote: string }> = []
              while ((match = stringRegex.exec(line)) !== null) {
                stringMatches.push({
                  start: match.index,
                  end: match.index + match[0].length,
                  content: match[2],
                  quote: match[1]
                })
              }

              // Build parts array
              let currentIndex = 0
              stringMatches.forEach(stringMatch => {
                // Add text before string
                if (stringMatch.start > currentIndex) {
                  parts.push({
                    text: line.substring(currentIndex, stringMatch.start),
                    type: 'normal'
                  })
                }
                // Add string
                parts.push({
                  text: stringMatch.quote + stringMatch.content + stringMatch.quote,
                  type: 'string'
                })
                currentIndex = stringMatch.end
              })
              // Add remaining text
              if (currentIndex < line.length) {
                parts.push({
                  text: line.substring(currentIndex),
                  type: 'normal'
                })
              }

              // If no strings found, process entire line
              if (parts.length === 0) {
                parts.push({ text: line, type: 'normal' })
              }

              // Process keywords in normal text parts
              const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'type', 'interface', 'export', 'import', 'as', 'typeof', 'keyof', 'extends', 'implements', 'class', 'enum', 'namespace', 'module', 'declare', 'abstract', 'private', 'public', 'protected', 'static', 'readonly', 'async', 'await', 'new', 'this', 'super', 'void', 'any', 'unknown', 'never', 'boolean', 'number', 'string', 'object', 'undefined', 'null', 'true', 'false']
              
              return (
                <div key={index} className="flex flex-wrap">
                  {parts.map((part, partIndex) => {
                    if (part.type === 'string') {
                      return (
                        <span key={partIndex} className="text-[#032f62]">
                          {part.text}
                        </span>
                      )
                    }
                    
                    // Process keywords in normal text
                    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
                    const keywordMatches: Array<{ word: string; index: number }> = []
                    let keywordMatch
                    while ((keywordMatch = keywordRegex.exec(part.text)) !== null) {
                      keywordMatches.push({
                        word: keywordMatch[0],
                        index: keywordMatch.index
                      })
                    }

                    if (keywordMatches.length === 0) {
                      return <span key={partIndex} className="text-black">{part.text}</span>
                    }

                    // Build spans with keywords highlighted
                    const spans: JSX.Element[] = []
                    let lastPos = 0
                    keywordMatches.forEach(({ word, index }) => {
                      // Add text before keyword
                      if (index > lastPos) {
                        spans.push(
                          <span key={`${partIndex}-${lastPos}`} className="text-black">
                            {part.text.substring(lastPos, index)}
                          </span>
                        )
                      }
                      // Add keyword
                      spans.push(
                        <span key={`${partIndex}-${index}`} className="text-[#d73a49] font-semibold">
                          {word}
                        </span>
                      )
                      lastPos = index + word.length
                    })
                    // Add remaining text
                    if (lastPos < part.text.length) {
                      spans.push(
                        <span key={`${partIndex}-${lastPos}`} className="text-black">
                          {part.text.substring(lastPos)}
                        </span>
                      )
                    }
                    return <React.Fragment key={partIndex}>{spans}</React.Fragment>
                  })}
                </div>
              )
            })}
          </code>
        </pre>
      </div>

      {/* Collapse indicator */}
      {shouldCollapse && !isExpanded && (
        <div 
          className="px-4 py-2 bg-black/5 border-t border-black/10 cursor-pointer hover:bg-black/10 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <p className="text-xs text-black/60 text-center" style={{ textTransform: 'none', fontVariant: 'normal', isolation: 'isolate' }}>
            <span style={{ display: 'inline-block' }}>Click</span> to expand {lineCount - 5} more lines
          </p>
        </div>
      )}
    </div>
  )
}

