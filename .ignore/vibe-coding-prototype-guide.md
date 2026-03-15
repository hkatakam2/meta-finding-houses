# Meta Home Discovery — Vibe Coding Prototype Guide

## Interview Strategy: The 20-Minute Blueprint

| Time | Phase | What You Build |
|------|-------|---------------|
| 0:00–1:00 | **Setup** | Scaffold the project |
| 1:00–5:00 | **Screen 1** | Facebook Feed → Home Discovery card |
| 5:00–9:00 | **Screen 2** | AI Search + Listing Results |
| 9:00–13:00 | **Screen 3** | Neighborhood Pulse page |
| 13:00–17:00 | **Screen 4** | HomeBoard Collaboration view |
| 17:00–20:00 | **Polish** | Navigation, transitions, final touches |

> **Interviewer framing (say this out loud):** "I'm going to build a prototype that walks through Fiona's journey — from discovery in her Facebook feed, through AI-powered search, to the social proof moment when she discovers a friend lives nearby, and finally collaborative decision-making with her partner."

---

## Phase 0: Project Setup (1 minute)

### Prompt 1 — Scaffold

```
Create a new React project using Vite with TypeScript and Tailwind CSS.
Set it up as a mobile-first app (iPhone 14 viewport: 390x844).
Add react-router-dom for navigation between screens.
Use a clean, modern design system with these colors:
- Primary: #1877F2 (Meta blue)
- Background: #F0F2F5 (Facebook light gray)
- Cards: #FFFFFF
- Text: #1C1E21
- Secondary text: #65676B
- Accent green: #31A24C
Install lucide-react for icons.
```

### Prompt 2 — Run the dev server

```
Run the dev server so I can preview it in the browser.
```

> **Tip:** Once the dev server is running, open `localhost:5173` in Chrome DevTools mobile view (iPhone 14).

---

## Phase 1: Facebook Feed with Discovery Card (4 minutes)

### Prompt 3 — Feed Screen

```
Create the first screen: a simplified Facebook-style feed at route "/".

It should have:
1. A top nav bar with "facebook" logo text on the left and a home/marketplace/notifications icon row
2. A scrollable feed with 2-3 simple post placeholders (gray boxes with avatar circles and text lines)
3. Between the posts, insert a PROMINENT discovery card that looks like a native ad/suggestion card with:
   - A small "Suggested for you" label at top
   - A hero image placeholder (use a gradient blue-to-green background with a house emoji centered)
   - Bold text: "Homes in your price range near you"
   - Subtitle: "12 new listings this week"
   - A blue "Explore Homes" CTA button
   - The card should have rounded corners, subtle shadow, and feel native to the Facebook feed

Make this card tappable — clicking it navigates to "/discover".
```

### Refinement Prompts (if needed):

| Issue | Prompt |
|-------|--------|
| Card doesn't stand out | `"Make the discovery card more visually prominent — add a light blue background tint (#E7F3FF), increase the shadow, and make the CTA button full-width and larger (48px height)."` |
| Feed looks too empty | `"Add 3 more feed post placeholders above and below the card. Each placeholder should have a circular avatar (40px), two lines of gray text bars, and a like/comment/share button row."` |
| Card image looks flat | `"Replace the gradient background with a collage-style layout: split the hero into 3 angled panels with different house-related emoji (🏡🏠🏘️) on soft pastel backgrounds."` |
| Navigation missing | `"Add a sticky bottom tab bar with 5 icons: Home, Friends, Video, Marketplace, Notifications. Highlight Home as active with blue color."` |

---

## Phase 2: AI Search + Listing Results (4 minutes)

### Prompt 4 — Discovery Screen with AI Search

```
Create the "/discover" screen — the Home Discovery tab. It should have:

1. A top bar with a back arrow (goes to "/") and title "Home Discovery"
2. An AI search bar that looks like a chat input with:
   - A sparkle/magic icon on the left (to indicate AI)
   - Placeholder text: "Describe your dream home..."
   - The search bar should have a soft purple-blue gradient border to signal AI
3. Below the search bar, show a "searching" state that animates briefly, then reveals results
4. Show pre-populated search text in the bar: "3 bedroom house under $400K near good elementary schools in a quiet, walkable neighborhood"
5. Below it, show a results header: "15 homes found · Sorted by neighborhood match"
6. Show 3 listing cards, each with:
   - A photo placeholder (colored gradient rectangle, different color per card)
   - Price in bold (e.g., "$385,000")
   - Address line (e.g., "142 Willow Creek Dr, Austin, TX")
   - Specs row: "3 bed · 2 bath · 1,850 sqft"
   - A "Neighborhood Pulse" badge showing a match score (e.g., "87% match") with a green/yellow color based on score
   - A heart/save icon in the top-right corner of the card

Make the first card's neighborhood name ("Willow Creek") tappable — it navigates to "/neighborhood".
The Neighborhood Pulse badge on the first card should show "87% match" in green.
```

### Refinement Prompts (if needed):

| Issue | Prompt |
|-------|--------|
| AI search doesn't feel smart | `"Add a row of AI-suggested filter chips below the search bar: 'Family-friendly', 'Walkable', 'Good schools', 'Under $400K'. Style them as rounded pills with a subtle sparkle icon."` |
| Cards feel generic | `"Add a small 'Friends nearby' indicator on the first card — a row of 2 small overlapping avatar circles with text '2 friends live here' in Meta blue."` |
| Match score unclear | `"Make the Neighborhood Pulse badge more visual — add a small circular progress ring around the percentage number, filled in green proportional to the score."` |
| Need more visual hierarchy | `"Make the first listing card slightly larger than the others and add a subtle 'Top Match' ribbon in the top-left corner with a star icon."` |

---

## Phase 3: Neighborhood Pulse Page (4 minutes)

### Prompt 5 — Neighborhood Pulse

```
Create the "/neighborhood" screen — the Neighborhood Pulse page for "Willow Creek". This is the KEY differentiator screen, so make it impressive.

Layout from top to bottom:

1. Top bar with back arrow (goes to "/discover") and title "Willow Creek"

2. Hero section:
   - Neighborhood name "Willow Creek" in large bold text
   - Subtitle: "Austin, TX · Family-Friendly Neighborhood"
   - A large circular score badge: "87" with text "Neighborhood Match" below it, colored green
   - Row of 4 mini stat pills: "🏫 A-rated schools" "🚶 Walkability 92" "🌳 Parks nearby 5" "🔒 Safety: Low crime"

3. AI Summary card (with a sparkle icon header "AI Neighborhood Summary"):
   - Styled as a distinct card with a very light purple/blue background
   - Text: "Residents describe Willow Creek as a tight-knit, family-oriented community with low traffic, well-maintained sidewalks, and a beloved Saturday farmers market. Recent Group discussions mention a new playground being built at the community park."
   - Small "Sources: 47 resident reviews, 12 Facebook Groups" footer in gray

4. SOCIAL PROOF section — this is the magic moment:
   - Section header: "People You Know Here"
   - A card showing: circular avatar, "Maya Chen", "Lives 0.4 miles from this listing", "Friends since 2019"
   - A blue "Message Maya" button
   - Below: "2 other friends have searched this area"

5. "Ask a Neighbor" button — full width, outlined style, with a chat bubble icon
   - Text: "Ask a verified resident about this neighborhood"

Make the "Message Maya" button tappable — show a simple Messenger-style modal overlay when tapped.
```

### Refinement Prompts (if needed):

| Issue | Prompt |
|-------|--------|
| Social proof not impactful enough | `"Make the 'People You Know Here' section more prominent — add a light yellow background, increase Maya's avatar to 56px, add her profile photo placeholder, and add a quote bubble: 'I love it here! The farmers market is amazing.' Make the whole section feel warm and personal."` |
| AI summary looks like plain text | `"Style the AI summary card with a left purple border (4px), add a subtle gradient background from light purple to white, and put 'Meta AI' with a sparkle icon as the card header."` |
| Score badge not impressive | `"Make the score badge animated — when the page loads, the number should count up from 0 to 87. Add a circular progress ring that fills as the number counts up. Use a gradient from blue to green for the ring."` |
| Messenger modal too simple | `"In the Messenger modal, pre-populate a suggested message: 'Hey Maya! I'm looking at a house near you on Willow Creek Dr. What's the neighborhood like?' Show Maya's avatar, name, and 'Active now' status with a green dot. Add a send button."` |
| Need community feel | `"Add a 'Recent Community Activity' section below the Ask a Neighbor button. Show 2-3 items: '📣 New playground approved at Community Park — 23 reactions', '🎃 Block Party Oct 15 — 45 interested', '🏫 Lincoln Elementary rated #3 in district — shared 12 times'. Style these as compact feed items."` |

---

## Phase 4: HomeBoard Collaboration (4 minutes)

### Prompt 6 — HomeBoard Screen

```
Create the "/homeboard" screen — the collaborative HomeBoard called "Our First Home".

Layout:

1. Top bar with back arrow and title "Our First Home 🏠" with a share icon on the right

2. Collaborators row:
   - Two circular avatars side by side (Fiona with a purple placeholder, Jay with a blue placeholder)
   - Text: "Fiona & Jay · 3 saved homes"

3. View toggle: "Cards" | "Compare" (tabs), default to Cards view

4. Show 3 saved listing cards in a vertical list. Each card should have:
   - Photo placeholder, price, address, specs (like the discover screen)
   - Neighborhood match score badge
   - A row of emoji reactions below the card (👍 ❤️ 🤔) — the first card should show Jay's 🤔 reaction
   - A notes area below reactions showing: Jay's avatar + "Love the neighborhood but commute is a stretch. Can we find something 10 min closer?" with a timestamp

5. A "Compare" view toggle that when active shows a side-by-side comparison matrix:
   - 3 columns (one per listing)
   - Rows: Price, Bedrooms, Sqft, Neighborhood Score, Commute (Jay), Schools Rating, Friends Nearby
   - Highlight the best value in each row with green text

6. A floating action button at bottom-right with a "+" icon for saving new listings

7. At the bottom, a small "AI Q&A" bar: input with sparkle icon and placeholder "Ask anything about these homes..."

Add navigation: make the bottom of the Neighborhood Pulse screen have a "Save to HomeBoard" button that navigates here.
```

### Refinement Prompts (if needed):

| Issue | Prompt |
|-------|--------|
| Compare view too dense | `"In the compare view, only show 4 key rows: Price, Neighborhood Score, Commute, and Schools. Make each cell larger with the value in bold and a small label above in gray. Highlight the winner in each row with a green background."` |
| Notes feel disconnected | `"Add a threaded reply to Jay's note: Fiona's avatar + 'Found 2 more closer to your office! Check the new ones ❤️' — make it feel like a real conversation."` |
| Reactions not intuitive | `"Make the reactions row more interactive — show each emoji as a tappable circle button. When tapped, it grows slightly with a bounce animation. Show who reacted below each emoji as small avatar dots."` |
| Need to show AI Q&A | `"When tapping the AI Q&A bar, show a modal with the question 'Is Willow Creek safe for walking at night?' pre-filled and an AI response card below: 'Based on public safety data and resident reviews, Willow Creek has a low crime index (12th percentile in Austin). 94% of resident reviewers rated it 4/5 or higher for safety.' Style the response with the Meta AI sparkle header."` |
| Missing the tour booking | `"Add a prominent 'Schedule Tour' button on each listing card — blue, full width at the bottom of the card. The first card should show 'Tour Requested ✓' in green instead."` |

---

## Phase 5: Polish & Navigation (3 minutes)

### Prompt 7 — Global Navigation & Transitions

```
Add these finishing touches across all screens:

1. Add smooth slide transitions between screens (slide left when navigating forward, slide right when going back)

2. On the Neighborhood Pulse screen, add a "Save to HomeBoard" sticky footer button. When tapped, show a brief toast notification: "Saved to 'Our First Home 🏠'" and then navigate to "/homeboard"

3. Add a bottom navigation bar on the discover, neighborhood, and homeboard screens with 4 tabs:
   - 🏠 Feed (goes to "/")
   - 🔍 Discover (goes to "/discover")
   - 📍 Neighborhoods (goes to "/neighborhood")
   - 📋 HomeBoard (goes to "/homeboard")
   Highlight the current tab in Meta blue

4. Make sure all screens scroll properly and have consistent padding/margins

5. Add subtle loading skeletons (gray shimmer placeholders) that briefly show when navigating to new screens
```

### Refinement Prompts (if needed):

| Issue | Prompt |
|-------|--------|
| Transitions janky | `"Remove the slide transitions, use simple fade transitions instead with 200ms duration."` |
| Bottom nav overlaps content | `"Add 80px of bottom padding to all scrollable screen content so nothing hides behind the bottom nav bar."` |
| Need more Meta branding | `"Add the Meta logo (just the word 'Meta' in the Meta font style — bold, slightly rounded) in the top-left of the discover and homeboard screens. Use #1877F2 color."` |

---

## Quick Reference: Prompt Engineering Cheat Sheet

### Structure Every Prompt Like This:

```
[WHAT screen/component] + [LAYOUT from top to bottom] + [SPECIFIC content/data] + [INTERACTION behavior] + [VISUAL style details]
```

### Power Phrases for Refinement:

| Want | Say |
|------|-----|
| Bigger | `"Increase the height of X to 56px and the font size to 18px"` |
| More spacing | `"Add 16px of padding inside the card and 12px gap between cards"` |
| Different color | `"Change the background of X from white to #E7F3FF (light blue)"` |
| More prominent | `"Add a 2px blue left border, increase font weight to 600, and add a subtle box shadow"` |
| Less cluttered | `"Remove the subtitle and icon from X. Keep only the title and the CTA button"` |
| More interactive feel | `"Add a scale(1.02) transform on hover/tap for X with a 150ms transition"` |
| Fix alignment | `"Center X horizontally and align Y to the right edge of its container"` |
| Match Meta style | `"Use the Facebook card style: white background, 8px border radius, 1px solid #E4E6EB border, no box shadow"` |

### Emergency Prompts (When Things Go Wrong):

| Problem | Prompt |
|---------|--------|
| Screen is blank | `"Check for errors in the console. The screen at route '/X' is showing blank — make sure the route is registered and the component is exported correctly."` |
| Layout is broken | `"The layout on the X screen is broken. Reset it to a simple single-column flexbox layout with 16px padding on all sides."` |
| Too many things on screen | `"Simplify the X screen. Keep only: [list the 3 most important elements]. Remove everything else."` |
| Ran out of time | `"Remove the [least important screen] route. On the [previous screen], replace its navigation button with a static label that says 'Coming soon' in gray."` |

---

## Interview Presentation Script

While building, narrate your product thinking:

### Screen 1 (Feed):
> "The entry point is critical — we meet users where they already are, in their Facebook feed. This discovery card uses social context signals to surface relevant listings, driving top-of-funnel awareness."

### Screen 2 (AI Search):
> "Instead of traditional filter dropdowns, we use natural language search powered by Meta AI. This dramatically lowers the friction of the initial search — users describe what they want in their own words, and AI translates that into structured filters plus our unique Neighborhood Pulse matching."

### Screen 3 (Neighborhood Pulse):
> "This is the core differentiator. No other platform can show you that your friend Maya lives 0.4 miles away. This social proof moment — powered by Meta's social graph — transforms an anxious decision into a confident one. The 'Ask a Neighbor' feature taps into authentic community knowledge."

### Screen 4 (HomeBoard):
> "Home buying is a collaborative decision. HomeBoard brings the decision-making process into a shared, social space — reactions, notes, and an AI-powered comparison matrix help couples and families align on the right choice without the back-and-forth of texting screenshots."

---

## Pre-Interview Checklist

- [ ] Install Node.js 18+ and npm
- [ ] Test `npm create vite@latest` works (takes ~30s)
- [ ] Have Chrome DevTools ready (F12 → toggle device toolbar → iPhone 14)
- [ ] Practice the full flow once (target: 18 minutes)
- [ ] Have this guide open in a second tab for prompt copy-paste
- [ ] Know your narration script for each screen

---

## Fallback Strategy (If Behind on Time)

**If at 10 minutes and only on Screen 2:**
- Skip HomeBoard (Screen 4) entirely
- Build a simplified Neighborhood Pulse (Screen 3) with just the AI summary and social proof section
- Use remaining time for polish

**If at 15 minutes and only on Screen 3:**
- Skip HomeBoard, add a simple "Save & Share" button that shows a toast message
- Use remaining time to polish Screens 1-3

**Minimum Viable Prototype (3 screens in 15 min):**
1. Feed with discovery card
2. AI search with listing results
3. Neighborhood Pulse with social proof

These 3 screens demonstrate the complete unique value proposition. The HomeBoard is impressive but optional.
