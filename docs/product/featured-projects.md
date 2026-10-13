# Featured Projects Specification & Case Studies

> **Document ID:** DOC-PROD-002  
> **Status:** Approved  
> **Role:** Flagship Project Specifications & Engineering Narratives

---

## 1. Flagship Project 1: EduScheduler

### 1.1. Project Metadata
* **Domain:** Higher Education Resource Management & Scheduling.
* **Role:** Lead Frontend Architect & Full-Stack Engineer.
* **Core Stack:** React 19, TypeScript, Tailwind CSS, PHP 8.x, MySQL, Docker.
* **Key Focus:** Real-time conflict avoidance, optimistic concurrency, multi-tier RBAC.

### 1.2. The Engineering Challenge
Large academic institutions manage hundreds of shared lecture halls, computer labs, and seminar rooms. Prior scheduling systems suffered from:
1. **Booking Collisions:** Concurrent booking attempts during schedule registration periods resulted in double-booked facilities and administrative gridlock.
2. **Complex Recurrence Rules:** Weekly recurring lectures over 16-week semesters with holiday blackout dates and midterm room reallocations.
3. **Cluttered, Inaccessible UIs:** Legacy table-heavy interfaces that were unusable on mobile devices and inaccessible via keyboard.

### 1.3. The Architectural Solution
* **PHP REST Backend:**
  - Designed clean service and repository boundaries using PSR-12 and strict PHP typing.
  - Implemented interval overlap detection algorithms (`[start, end)` SQL queries with `FOR UPDATE` transaction locks).
  - Built an automated recurrence expansion engine generating concrete semester slots from RFC 5545 iCalendar-style rules.
* **Interactive React Frontend:**
  - Built a custom schedule grid component in React and TypeScript with zero external calendar library bloat.
  - Implemented optimistic UI updates: Local state reflects bookings instantly; if a collision occurs on the server, the state cleanly rolls back with visual conflict indicators.
  - Embedded client-side collision detection allowing instant pre-flight validation before network dispatch.

### 1.4. Measurable Engineering Metrics
* **Conflict Rate:** Reduced double-booking incidents from ~12% to **0%**.
* **API Response Time:** Clash check endpoints average **< 45ms** across 50,000 active semester records.
* **Accessibility:** 100% keyboard navigable with full ARIA announcements for screen readers.

---

## 2. Flagship Project 2: Smart TV Engine (LightningJS)

### 2.1. Project Metadata
* **Domain:** 10-Foot UI, Connected Devices & OTT Streaming Applications.
* **Role:** Senior Frontend Engineer & Graphics Specialist.
* **Core Stack:** LightningJS (Canvas 2D / WebGL), TypeScript, Spatial Navigation Engine, Tizen, webOS.
* **Key Focus:** Embedded memory constraints, sustained 60fps frame budget, D-pad spatial navigation.

### 2.2. The Engineering Challenge
Connected TV devices (Samsung Tizen, LG webOS, Comcast X1, operator set-top boxes) feature severely limited hardware:
* Dual-core ARM processors clocked under 1.2 GHz.
* Less than 512MB RAM available to the web app runtime.
* The standard HTML DOM is inherently unsuitable: layout reflows, style calculations, and compositing layers cause severe frame drops and crashes.
* No mouse or touch gestures: UI interaction is driven entirely by a 6-key remote control (Up, Down, Left, Right, Enter, Back).

### 2.3. The Architectural Solution
* **DOM-Free Rendering Pipeline:**
  - Replaced HTML elements with a lightweight WebGL/Canvas scene graph powered by LightningJS.
  - Every UI element is an accelerated node with explicit coordinates and GPU texture bindings.
* **Deterministic Spatial Navigation:**
  - Built a hierarchical focus tree where each component manages its own focus state via lifecycle hooks (`_focus()`, `_unfocus()`, `_handleKey()`).
  - Implemented smooth camera and carousel scrolling where the focused item stays anchored in the optimal viewing viewport.
* **Texture & Memory Lifecycle:**
  - Engineered an automatic texture pool that frees off-screen thumbnails and video posters, preventing out-of-memory (OOM) crashes on low-spec hardware.
  - Eradicated garbage collection pauses by eliminating object allocations inside animation request frames.

### 2.4. Measurable Engineering Metrics
* **Frame Rate:** Sustained **60 FPS** during rapid D-pad horizontal carousel scrolling.
* **Input Latency:** Remote control button click to visual response latency reduced to **< 16.6ms** (1 frame).
* **Memory Footprint:** Maintained heap allocation under **65 MB**, completely eliminating TV OS OOM process kills.
