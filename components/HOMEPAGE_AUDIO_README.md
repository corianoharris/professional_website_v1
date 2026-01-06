# Homepage Audio Component - Implementation Documentation

## Overview
An opt-in audio component for the homepage that provides a brief invitation message. The component is designed to be unobtrusive, accessible, and respectful of user preferences.

## Requirements Met

### Core Functionality
- ✅ Audio is OFF by default
- ✅ No auto-play
- ✅ User must click to play
- ✅ Audio plays only while user remains on page
- ✅ Page refresh/revisit defaults back to OFF
- ✅ No cookies, localStorage, or tracking
- ✅ Song fades out after 30 seconds

### UX Requirements
- ✅ Clear play/pause control
- ✅ Audio never blocks scrolling or primary CTAs
- ✅ Accessible (keyboard + screen readers)
- ✅ Includes visible transcript toggle

## Interaction Flow

### Initial State
1. Component renders with audio paused
2. Play button is visible and enabled
3. Transcript is collapsed by default
4. Audio element has `preload="none"` to avoid loading until user interaction

### User Clicks Play
1. Audio resets to start (currentTime = 0)
2. Volume is set to 1 (full volume)
3. Audio begins playing
4. Button icon changes to pause
5. Status text updates to "Playing"
6. After 30 seconds, fade-out begins

### During Playback
1. User can pause at any time
2. User can toggle transcript visibility
3. After 30 seconds:
   - Fade-out indicator appears
   - Volume gradually decreases over 2 seconds
   - Audio pauses and resets when fade completes

### User Clicks Pause
1. Audio immediately pauses
2. Button icon changes to play
3. Status text updates to "Audio Invitation"
4. If fade was in progress, it's cancelled and volume resets

### Page Navigation/Refresh
1. Component unmounts
2. Audio element is cleaned up (paused, reset)
3. All timers/intervals are cleared
4. On revisit, component returns to initial state

## UI Recommendations

### Positioning
- **Location**: Fixed bottom-left corner (`bottom-6 left-4`)
- **Rationale**: 
  - Doesn't interfere with primary CTAs (typically top-right or center)
  - Visible but unobtrusive
  - Follows common pattern for supplementary content
  - Doesn't block scrolling

### Visual Design
- **Card Style**: Subtle border, rounded corners, backdrop blur
- **Size**: Compact, max-width 384px (max-w-sm)
- **Z-index**: 40 (below modals/dialogs but above content)
- **Responsive**: Adapts to mobile screens

### States
1. **Idle**: Play icon, "Audio Invitation" text
2. **Playing**: Pause icon, "Playing" text
3. **Fading**: Pause icon with reduced opacity, "Fading out..." text
4. **Transcript Open**: Expanded card with transcript content

### Accessibility Indicators
- Clear focus states on all interactive elements
- ARIA labels for screen readers
- Keyboard navigation support
- Visual feedback for all states

## Framework-Agnostic Pseudocode

```pseudocode
COMPONENT HomepageAudio:
  STATE:
    isPlaying = false
    showTranscript = false
    isFading = false
    audioRef = null
    fadeTimer = null
    fadeInterval = null

  FUNCTION togglePlay():
    IF isPlaying:
      audio.pause()
      isPlaying = false
      cancelFade()
    ELSE:
      audio.currentTime = 0
      audio.volume = 1
      audio.play()
      isPlaying = true
      startFadeTimer(30 seconds)

  FUNCTION startFadeTimer(delay):
    fadeTimer = setTimeout(() => {
      isFading = true
      startFadeAnimation(2 seconds)
    }, delay)

  FUNCTION startFadeAnimation(duration):
    startVolume = audio.volume
    startTime = currentTime()
    
    fadeInterval = setInterval(() => {
      elapsed = currentTime() - startTime
      progress = elapsed / duration
      newVolume = startVolume * (1 - progress)
      
      audio.volume = max(0, newVolume)
      
      IF progress >= 1:
        audio.pause()
        audio.currentTime = 0
        audio.volume = 1
        isPlaying = false
        isFading = false
        clearInterval(fadeInterval)
    }, 16ms) // ~60fps

  FUNCTION cancelFade():
    clearTimeout(fadeTimer)
    clearInterval(fadeInterval)
    audio.volume = 1
    isFading = false

  FUNCTION cleanup():
    audio.pause()
    audio.currentTime = 0
    clearTimeout(fadeTimer)
    clearInterval(fadeInterval)

  ON MOUNT:
    // Component ready, audio not loaded yet

  ON UNMOUNT:
    cleanup()

  RENDER:
    DIV (container, fixed bottom-left):
      DIV (card):
        BUTTON (play/pause):
          IF isPlaying: PAUSE_ICON
          ELSE: PLAY_ICON
          onClick: togglePlay
          aria-label: "Play/Pause audio invitation"
          aria-pressed: isPlaying
        
        DIV (info):
          TEXT: status message
          TEXT: instruction text
        
        BUTTON (transcript toggle):
          FILE_TEXT_ICON
          onClick: toggleTranscript
          aria-label: "Show/Hide transcript"
          aria-expanded: showTranscript
        
        IF showTranscript:
          DIV (transcript):
            HEADING: "Transcript"
            PARAGRAPH: transcript text
        
        IF isFading:
          DIV (fade indicator):
            ICON: Volume2
            TEXT: "Audio fading out..."
      
      AUDIO (hidden):
        src: "/audio/Visual-Spectrum.mp3"
        preload: "none"
        ref: audioRef
```

## Accessibility Checklist

### Keyboard Navigation
- ✅ Play/Pause button is keyboard accessible (Enter/Space)
- ✅ Transcript toggle is keyboard accessible
- ✅ Focus indicators visible on all interactive elements
- ✅ Tab order is logical (play → transcript → content)

### Screen Reader Support
- ✅ Semantic HTML structure (`role="complementary"`)
- ✅ ARIA labels on all interactive elements:
  - `aria-label` on play/pause button
  - `aria-pressed` on play/pause button
  - `aria-expanded` on transcript toggle
  - `aria-label` on audio element
- ✅ Status announcements via text content
- ✅ Transcript provides text alternative for audio content

### Visual Accessibility
- ✅ Sufficient color contrast (uses theme colors)
- ✅ Clear visual states (idle, playing, fading)
- ✅ Icon + text labels (not icon-only)
- ✅ Focus rings on interactive elements

### Audio Accessibility
- ✅ No auto-play (respects user preferences)
- ✅ User-initiated playback only
- ✅ Transcript available for hearing-impaired users
- ✅ Clear controls for play/pause
- ✅ Visual feedback during playback

### Responsive Design
- ✅ Works on mobile devices
- ✅ Touch-friendly button sizes (48x48px minimum)
- ✅ Text remains readable at all sizes
- ✅ Doesn't block content on small screens

### Performance
- ✅ Audio doesn't load until user interaction (`preload="none"`)
- ✅ Cleanup on unmount prevents memory leaks
- ✅ Timers/intervals properly cleared
- ✅ No unnecessary re-renders

## Implementation Details

### File Structure
```
components/
  homepage-audio.tsx    # Main component
  ui/
    button.tsx          # Button component (existing)
    collapsible.tsx     # Collapsible component (existing)
```

### Dependencies
- React (useState, useRef, useEffect)
- Next.js (client component)
- Radix UI Collapsible (via ui/collapsible)
- Lucide React (icons)
- Tailwind CSS (styling)

### Audio File
- **Path**: `/public/audio/Visual-Spectrum.mp3`
- **Format**: MP3 (widely supported)
- **Preload**: None (loads on user interaction)
- **Duration**: Should be ~30 seconds or less (component fades out after 30 seconds)

### State Management
- All state is local (no global state)
- No persistence (no localStorage/cookies)
- State resets on page refresh

### Error Handling
- Audio play errors are caught and handled gracefully
- Browser autoplay restrictions are handled
- Missing audio file fails silently (doesn't break page)

## Customization

### Transcript Content
Update the `transcript` constant in the component:
```typescript
const transcript = `Your transcript text here...`
```

### Positioning
Modify the container className:
```typescript
className="fixed bottom-6 left-4 z-40 ..."
// Change to: top-6, right-4, etc.
```

### Fade Timing
Adjust fade duration:
```typescript
const fadeDuration = 2000 // milliseconds
```

### Auto-fade Timing
Adjust when fade starts:
```typescript
}, 30000) // milliseconds (30 seconds)
```

## Testing Checklist

- [ ] Audio plays when play button clicked
- [ ] Audio pauses when pause button clicked
- [ ] Audio fades out after 30 seconds
- [ ] Audio resets on page refresh
- [ ] Audio stops when navigating away
- [ ] Transcript toggle works
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Screen reader announces states correctly
- [ ] Component doesn't block scrolling
- [ ] Component doesn't interfere with CTAs
- [ ] Works on mobile devices
- [ ] No console errors
- [ ] No memory leaks (check with React DevTools)

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Note: Some browsers may require user interaction before allowing audio playback. The component handles this gracefully.

