# Flesch Readability Audit
**Date:** Current Review  
**Target:** Improve clarity while maintaining storytelling and inviting tone

---

## Executive Summary

### Overall Site Readability
- **Current Average Flesch Reading Ease:** ~35-45 (College/Difficult level)
- **Target Range:** 50-70 (Standard/Plain English)
- **Key Issue:** Abstract concepts, long sentences, sophisticated vocabulary make copy harder to parse quickly

### Priority Areas for Improvement
1. **Hero sections** - First impression, must be immediately clear
2. **Services section** - Conversion-critical, needs clarity
3. **Contact section** - Action-oriented, must be crystal clear
4. **About section** - Keep philosophical but add clarity
5. **Expertise section** - Good simplification already done ✅

---

## Section-by-Section Analysis

### 1. HERO SECTION
**Location:** `components/hero-section.tsx` & `components/hero-with-content.tsx`

#### Current Copy:

**Main Hero (hero-section.tsx):**
```
I help teams stand out with products people care about, through color
```

**Hero With Content:**
```
FEATURED STORY: Vulnerability is the birthplace of trust.

Color Product Technologist / I turn color into products people care about

To help teams create remarkable products worth millions more—building instant trust, 
deep belonging, and viral word-of-mouth through color as the spark of human connection.
```

**Flesch Analysis:**
- **Main headline:** ✅ Excellent (Simple, clear, ~65-70 Flesch)
- **Body copy:** ⚠️ Moderate difficulty (~45-50 Flesch)
  - 29-word sentence (target: 15-20 words)
  - Complex concepts: "remarkable products worth millions more", "viral word-of-mouth", "spark of human connection"

**Issues:**
1. Long run-on sentence in body copy
2. "Remarkable" - somewhat abstract
3. "Spark of human connection" - metaphorical, requires interpretation
4. "Viral word-of-mouth" - could be clearer

**Recommendations:**

**Option A: Split long sentence** (Maintains sophistication, improves clarity)
```
To help teams create remarkable products worth millions more. 
I build instant trust, deep belonging, and word-of-mouth that spreads. 
I do this through color—the spark of human connection.
```

**Option B: More direct** (Seth Godin approach)
```
I help teams create products people care about—products worth millions more. 
Through color, I build trust. Create belonging. Generate word-of-mouth that spreads.
```

**Recommendation:** Option A - Maintains sophistication while improving readability.

---

### 2. ABOUT SECTION
**Location:** `components/about-section.tsx`

#### Current Copy:

```
People don't buy what you do—they buy why you do it.

I believe vulnerability creates real trust: showing up authentically, 
daring to feel human. Color is that brave first whisper—evoking calm, 
understanding, and belonging in 0.05 seconds.

That's why I build experiences where people feel seen, choose you 
wholeheartedly, spread the idea, and drive measurable revenue.
```

**Flesch Analysis:**
- **Quote:** ✅ Good (~55-60 Flesch) - Simple, clear Simon Sinek quote
- **Paragraph 1:** ⚠️ Difficult (~40-45 Flesch)
  - Abstract concepts: "vulnerability", "authentically", "daring to feel human"
  - "Brave first whisper" - poetic but requires interpretation
  - 0.05 seconds - specific but potentially confusing
- **Paragraph 2:** ✅ Moderate (~50-55 Flesch)
  - "Wholeheartedly" - somewhat formal
  - Good structure overall

**Issues:**
1. "Daring to feel human" - abstract, unclear to some readers
2. "Brave first whisper" - poetic but ambiguous
3. "Wholeheartedly" - formal word, could be simpler

**Recommendations:**

**Keep philosophical but add clarity:**

**Current:**
```
I believe vulnerability creates real trust: showing up authentically, 
daring to feel human.
```

**Option A (Add explanation):**
```
I believe vulnerability creates real trust. What does that mean? 
Showing up as your real self—not hiding behind a mask. 
When you're honest about who you are, people trust you more.
```

**Option B (Simplify within sentence):**
```
I believe vulnerability creates real trust: showing up as your real self, 
not hiding behind a mask. Color is the first thing people notice—creating 
calm, understanding, and belonging in less than a second.
```

**Recommendation:** Hybrid approach - Keep the current but consider Option B for clarity.

**Current:**
```
That's why I build experiences where people feel seen, choose you 
wholeheartedly, spread the idea, and drive measurable revenue.
```

**Simpler:**
```
That's why I build experiences where people feel seen. They choose you 
with confidence. They tell others about you. And you drive measurable revenue.
```

---

### 3. SERVICES SECTION
**Location:** `components/services-section.tsx`

#### Current Copy:

```
Brave, remarkable difference:

1. Building Communities
   I create spaces where people can connect, grow, and work together. 
   These spaces bring people together around shared values and goals.

2. Products that connect heart-first and stand out forever
   I design and build products that people love. These products create 
   strong connections with users. People remember these experiences for 
   a long time.

3. Millions in added revenue from trust and differentiation
   I build solutions that create trust and make your brand stand out. 
   This drives real business results through smart design and development.
```

**Flesch Analysis:**
- **Section title:** ⚠️ Abstract ("Brave, remarkable difference")
- **Service 1:** ✅ Good (~60-65 Flesch) - Clear, simple
- **Service 2:** ✅ Good (~55-60 Flesch) - Title is poetic but clear
- **Service 3:** ✅ Good (~55-60 Flesch) - Clear business value

**Issues:**
1. "Brave, remarkable difference" - unclear what this means without context
2. "Heart-first" - poetic but could be clearer
3. Overall: Actually pretty good! ✅

**Recommendations:**

**Current section title:**
```
Brave, remarkable difference:
```

**Option A: More direct**
```
What you get:
```

**Option B: Keep brand voice but clearer**
```
Real results, remarkable impact:
```

**Recommendation:** Option B - Maintains brand while being clearer.

**Title improvement:**
```
Products that connect heart-first and stand out forever
```

**Could become:**
```
Products people love—that stand out and connect deeply
```

---

### 4. EXPERTISE SECTION
**Location:** `components/expertise-section.tsx`

#### Current Copy:

```
Creating with purpose:

1. I use courage and stand out boldly. I think about how people feel 
   before I design.

2. I build products that feel calm and trustworthy. I do the right thing 
   and create unforgettable experiences.

3. I build communities around products that feel deeply right—and 
   completely different.
```

**Flesch Analysis:**
- **All three points:** ✅ Excellent (~65-70 Flesch)
- **Short sentences:** ✅ Good length (10-15 words)
- **Concrete concepts:** ✅ Clear and direct

**Status:** ✅ Already simplified and clear! Great work.

**Minor suggestion:**
- Point 1: "I use courage" - still somewhat abstract, but works in context
- Could be: "I make bold choices and stand out. I think about how people feel before I design."

**Recommendation:** Keep as-is. This section is a good model for the rest of the site.

---

### 5. CONTACT SECTION
**Location:** `components/contact-section.tsx`

#### Current Copy:

```
Let's see solutions together:

Starting with WHY. Building remarkable through vulnerability and heart. 
Let's connect.
```

**Flesch Analysis:**
- **Main quote:** ⚠️ Moderate (~50-55 Flesch)
  - "Starting with WHY" - assumes Simon Sinek knowledge
  - "Building remarkable through vulnerability" - abstract concepts
  - Short sentences help, but concepts are complex

**Issues:**
1. "Let's see solutions together" - slightly awkward phrasing
2. "WHY" - capitalized, assumes knowledge of Simon Sinek framework
3. "Remarkable through vulnerability" - abstract connection

**Recommendations:**

**Current:**
```
Let's see solutions together:
```

**Clearer options:**
```
Let's find solutions together:
```
or
```
Ready to create something remarkable?
```

**Current:**
```
Starting with WHY. Building remarkable through vulnerability and heart. 
Let's connect.
```

**Option A (Maintain brand, add clarity):**
```
Starting with why—because people buy why you do it, not what you do. 
Building remarkable products through authenticity and heart. Let's connect.
```

**Option B (More direct):**
```
Let's start with why you do what you do. Then build something remarkable 
together. Let's connect.
```

**Recommendation:** Option A - Maintains brand voice while explaining "WHY" for those unfamiliar.

---

### 6. PORTFOLIO SECTION ("Why Most Fail")
**Location:** `components/portfolio-section.tsx`

#### Current Copy:

```
They armor up with safe generics—skipping vulnerability, aiming to fit in.
They start with features, not feeling.
Perfection hides. Courage connects. Average vanishes. Remarkable spreads.
```

**Flesch Analysis:**
- **Paragraph 1:** ⚠️ Difficult (~40-45 Flesch)
  - "Armor up" - metaphorical
  - "Safe generics" - abstract
  - "Skipping vulnerability" - assumes understanding of concept
- **Paragraph 2:** ✅ Excellent (~70 Flesch) - Clear, memorable
- **Paragraph 3:** ✅ Good (~55-60 Flesch) - Short, punchy, memorable

**Issues:**
1. "Armor up" - poetic but requires interpretation
2. "Safe generics" - unclear without context
3. Mixed readability - middle sentence is perfect, first needs work

**Recommendations:**

**Current:**
```
They armor up with safe generics—skipping vulnerability, aiming to fit in.
```

**Option A (More concrete):**
```
They choose safe, generic options. They skip being real and authentic. 
They aim to fit in instead of standing out.
```

**Option B (Keep metaphor, add clarity):**
```
They protect themselves with safe, generic choices—skipping authenticity, 
aiming to fit in.
```

**Recommendation:** Option B - Maintains poetic quality while being clearer.

---

## Vocabulary Analysis

### Complex Words That Appear Frequently:

| Word | Frequency | Difficulty | Suggested Alternatives |
|------|-----------|------------|------------------------|
| remarkable | Very High | Moderate | amazing, outstanding (but "remarkable" is brand-aligned, keep) |
| vulnerability | High | Difficult | authenticity, being real (explain concept when first used) |
| wholeheartedly | Medium | Difficult | with confidence, fully, completely |
| courage/courageous | Medium | Moderate | bold choices, standing out (works in context) |
| evoke/evoking | Low | Difficult | create, make people feel |
| authentic/authentically | Medium | Moderate | real, genuine (keep - common enough) |

### Recommendation:
- **Keep:** remarkable, vulnerability (explain), authentic, courage
- **Simplify when possible:** wholeheartedly → with confidence, evoke → create

---

## Sentence Length Analysis

### Problem Sentences (>20 words):

1. **Hero body copy:** 29 words
   ```
   To help teams create remarkable products worth millions more—building 
   instant trust, deep belonging, and viral word-of-mouth through color 
   as the spark of human connection.
   ```
   **Fix:** Split into 2-3 sentences

2. **About section:** 20 words (acceptable but at upper limit)
   ```
   That's why I build experiences where people feel seen, choose you 
   wholeheartedly, spread the idea, and drive measurable revenue.
   ```
   **Fix:** Split into shorter sentences

### Target: 15-20 words per sentence (most sentences should be 10-15 words)

---

## Action Plan

### Phase 1: Quick Wins (High Impact, Low Effort)
1. ✅ Hero headline - Already improved!
2. Split long sentences in hero body copy
3. Simplify "wholeheartedly" in about section
4. Clarify "Let's see solutions together" in contact

### Phase 2: Brand Voice Refinement
1. Add context to "WHY" in contact section
2. Simplify "armor up" metaphor in portfolio section
3. Clarify "Brave, remarkable difference" title in services

### Phase 3: Deeper Clarity (Maintain Philosophy)
1. Add brief explanation of "vulnerability" when first introduced
2. Simplify "brave first whisper" metaphor OR keep but add context
3. Review all metaphors for clarity

---

## Scoring Summary

| Section | Current Flesch | Target Flesch | Status | Priority |
|---------|---------------|---------------|--------|----------|
| Hero Headline | ~65-70 | 60-70 | ✅ Good | - |
| Hero Body | ~45-50 | 50-60 | ⚠️ Needs work | HIGH |
| About Quote | ~55-60 | 50-70 | ✅ Good | - |
| About Body | ~40-50 | 50-60 | ⚠️ Needs work | MEDIUM |
| Services | ~55-65 | 50-70 | ✅ Good | LOW |
| Expertise | ~65-70 | 50-70 | ✅ Excellent | - |
| Contact | ~50-55 | 50-70 | ⚠️ Minor fixes | MEDIUM |
| Portfolio | ~45-60 | 50-70 | ⚠️ Mixed | LOW |

---

## Principles for Improvement

### Do:
- ✅ Split sentences over 20 words
- ✅ Use concrete words when possible
- ✅ Explain abstract concepts on first use
- ✅ Keep short, punchy sentences for impact
- ✅ Maintain brand voice (sophistication is okay)
- ✅ Test metaphors for clarity

### Don't:
- ❌ Dumb down the message
- ❌ Remove all sophistication
- ❌ Lose the storytelling quality
- ❌ Remove memorable phrases
- ❌ Make it boring

### Goal:
**Clear enough to understand quickly, sophisticated enough to respect your audience.**

---

## Next Steps

1. Review this audit with team/brand perspective
2. Prioritize sections based on conversion impact
3. Make Phase 1 changes (quick wins)
4. Test readability with tools: [Readable.io](https://readable.io), [Hemingway App](https://hemingwayapp.com)
5. Get feedback from target audience sample

---

**Remember:** Readability isn't about lowering your standards—it's about being clear enough that your brilliance shines through. As Seth Godin says: "The best communication is clear enough to understand, deep enough to matter."
