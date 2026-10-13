# ADR 0004: Smart TV Interactive Demo Sandbox Architecture

> **Status:** Accepted  
> **Date:** 2026-10-12  
> **Deciders:** Software Architect & Frontend Engineer

---

## 1. Context and Problem Statement

A defining pillar of the author's technical background is **Smart TV and Connected Device development** using **LightningJS** (Canvas 2D / WebGL scene graphs, 10-foot UI, D-pad spatial navigation, and embedded memory constraints).

However, Smart TV apps run on proprietary hardware and embedded runtimes (e.g., Tizen, webOS, Metrological, RDK). Communicating this specialized expertise through static screenshots or videos does not sufficiently showcase technical mastery of spatial focus state machines, 60fps frame budgeting, and texture lifecycle management.

---

## 2. Decision Drivers

* **Interactive Demonstration:** Visitors must be able to experience 10-foot spatial navigation directly in a desktop/mobile web browser.
* **Authenticity:** The sandbox must reflect real TV rendering paradigms (Canvas scene graph, zero DOM nodes inside the screen, D-Pad input model).
* **Performance:** The browser canvas loop must run at a smooth, stable 60 FPS without degrading the host portfolio page.

---

## 3. Considered Options

1. **Option A: Static Video / GIF Showcase.** Embed recorded screen captures of real TV apps.
2. **Option B: Web-based DOM Emulation.** Use standard HTML/CSS `div`s with CSS transitions and keyboard listeners.
3. **Option C: Canvas 2D / WebGL Interactive Sandbox with Virtual D-Pad Remote.** Render the TV screen strictly inside a `<canvas>` element using a lightweight scene-graph renderer simulating LightningJS mechanics, controlled by keyboard arrow keys or an on-screen interactive remote control.

---

## 4. Decision Outcome

**Chosen Option: Option C — Canvas 2D / WebGL Interactive Sandbox with Virtual D-Pad Remote.**

### Implementation Blueprint:
1. **Isolated Viewport:** An embedded 16:9 `<canvas>` viewport decoupled from React DOM reconciliation.
2. **Scene Graph & Focus Engine:** A lightweight TypeScript scene graph implementing LightningJS lifecycle methods (`_focus`, `_unfocus`, `_handleKey`).
3. **Dual Input Mode:**
   - Physical keyboard navigation via `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Enter`, and `Backspace/Escape`.
   - On-screen SVG TV Remote Control with clickable D-pad buttons for mouse/touch visitors.
4. **Telemetry HUD:** An overlay showing real-time FPS, draw calls, active focused node ID, and simulated memory pool usage.

---

## 5. Consequences

### Positive
* Delivers a memorable, interactive experience that proves senior-level systems graphics competence.
* Allows visitors to experience the exact mechanics of 10-foot UI navigation.
* Accurately reflects embedded device engineering principles.

### Negative
* Requires building and maintaining a lightweight 2D canvas scene graph engine in TypeScript (encapsulated in `src/services/tv-emulator/`).
