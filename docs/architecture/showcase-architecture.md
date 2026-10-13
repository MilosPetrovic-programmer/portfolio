# Showcase Technical Architecture Deep-Dives

> **Document ID:** DOC-ARCH-004  
> **Status:** Approved  
> **Role:** Engineering Architecture Deep-Dive for EduScheduler & Smart TV (LightningJS)

---

## 1. Executive Context

This document provides deep technical architectural analyses of the two flagship engineering achievements featured in this portfolio:
1. **EduScheduler:** An enterprise classroom and resource reservation platform (PHP backend & React frontend).
2. **Smart TV Applications (LightningJS):** Embedded 10-foot user interfaces engineered for connected TV hardware running WebGL/Canvas 2D render trees.

---

## 2. Showcase Deep-Dive 1: EduScheduler

### 2.1. Problem Space & Domain Challenges
Educational institutions and university campuses operate across hundreds of physical classrooms, lecture halls, and specialized laboratories. Scheduling challenges include:
* **High Concurrency Overlaps:** Hundreds of professors and faculty staff attempting to book rooms during registration rush windows.
* **Complex Recurrence:** Weekly lectures spanning 16-week semesters with holiday blackouts and exam week schedule overrides.
* **Multi-Tier Authorization (RBAC):** Students can request study rooms; Professors can reserve standard lecture halls; Facility Admins oversee high-value labs and override bookings.

### 2.2. PHP Backend & API Architecture
The EduScheduler backend was engineered in PHP 8.x adhering to clean architectural boundaries, PSR-12 formatting, and Domain-Driven Design (DDD):

```
backend-php/
├── src/
│   ├── Domain/
│   │   ├── Model/ (Room, Reservation, TimeInterval, UserRole)
│   │   └── Repository/ (ReservationRepositoryInterface)
│   ├── Application/
│   │   ├── Command/ (CreateReservationCommand, CancelReservationCommand)
│   │   └── Service/ (ConflictDetectionService, RecurrenceExpanderService)
│   ├── Infrastructure/
│   │   ├── Persistence/ (Doctrine ORM / PDO MySQL Adapter)
│   │   └── Http/ (Controllers, Middlewares, ResponseSerializers)
│   └── Shared/
│       └── ValueObject/ (DateRange, ClassroomCapacity)
```

#### The Conflict Detection Algorithm
To detect scheduling overlaps in sub-millisecond time across tens of thousands of semester bookings, the PHP backend implements interval overlap logic:

$$\text{Overlap Condition: } \max(\text{Start}_A, \text{Start}_B) < \min(\text{End}_A, \text{End}_B)$$

In MySQL, this is indexed via composite B-tree indices on `(room_id, start_time, end_time)` and queried via:
```sql
SELECT id, room_id, start_time, end_time 
FROM reservations 
WHERE room_id = :roomId 
  AND status = 'CONFIRMED'
  AND start_time < :requestedEnd 
  AND end_time > :requestedStart
FOR UPDATE; -- Prevents concurrent race conditions during booking transactions
```

### 2.3. React Frontend Architecture
The client application delivers a desktop-grade scheduling canvas built with React, TypeScript, and Tailwind CSS:
* **Optimistic Concurrency:** UI blocks update instantly. If the PHP API returns an HTTP 409 Conflict, an automatic rollback is executed with visual clash highlighting.
* **Interval Collision Visualizer:** A client-side conflict detection engine mirrors server-side validation rules in real time, preventing users from attempting invalid reservations before network dispatch.
* **Component Partitioning:**
  - `ReservationCalendarShell`: Date range picker, view switcher (Day/Week/Month).
  - `RoomTimeGrid`: High-performance CSS Grid/Canvas rendering time intervals.
  - `BookingConflictModal`: Actionable resolution modal proposing alternative slots or adjacent rooms.

---

## 3. Showcase Deep-Dive 2: Smart TV Engine (LightningJS)

### 3.1. The 10-Foot UI Constraint Problem
Connected TVs (Samsung Tizen, LG webOS, Comcast X1, Android TV set-top boxes) present unique engineering constraints far removed from standard web development:
* **Hardware Profile:** Low-power single-core or dual-core ARM CPUs (often clocked below 1.2 GHz) and constrained RAM (< 512 MB to 1 GB total system memory shared with OS).
* **The Failure of the HTML DOM:** Standard DOM trees incur heavy memory allocations, expensive style recalcs, reflows, and compositing latency, dropping frame rates well below 30 FPS.
* **Viewing Distance:** Users view the screen from 10 feet away using an infrared or Bluetooth remote control (no mouse pointer, no touch gestures).

```
┌────────────────────────────────────────────────────────┐
│                   THE 10-FOOT UI STACK                 │
├────────────────────────────────────────────────────────┤
│  Application Layer: Component Tree & Focus State Mach. │
├────────────────────────────────────────────────────────┤
│  LightningJS Framework: Render Tree, Tweens, Textures  │
├────────────────────────────────────────────────────────┤
│  Driver / Hardware Layer: WebGL / Canvas2D Context     │
├────────────────────────────────────────────────────────┤
│  Physical TV Chipset (ARM CPU / Embedded GPU)          │
└────────────────────────────────────────────────────────┘
```

### 3.2. LightningJS Architectural Principles
LightningJS bypasses the DOM entirely, rendering UI components directly as a scene graph onto a single WebGL (or hardware-accelerated Canvas 2D) context.

1. **Scene Graph & Render Tree:** UI elements inherit from `lng.Component`. Every node has explicit `x, y, w, h`, texture references, and shader configurations.
2. **Deterministic Spatial Navigation:** Focus transitions are managed through a hierarchical state machine:
   - Navigation events (`_handleUp`, `_handleDown`, `_handleLeft`, `_handleRight`, `_handleEnter`, `_handleBack`) propagate deterministically down the active focus path.
   - When a node receives focus, it triggers `_focus()` to animate scaling or glow effects; when focus leaves, `_unfocus()` restores rest states.
3. **Strict 60 FPS Frame Budget (16.6ms):**
   - No garbage collection spikes during scroll transitions: Object allocation in animation loops is strictly prohibited.
   - Shaders handle smooth blurring, corner rounding, and tinting directly on the GPU.
4. **Texture Memory Lifecycle:**
   - Unused artwork, posters, and video thumbnails must be explicitly garbage-collected or pooled.
   - The texture pool recycles GPU texture memory to prevent TV OS kernel panics (OOM kills).

### 3.3. In-Portfolio Interactive TV Emulator
To showcase this specialized expertise in a web browser:
* The portfolio includes an embedded TV Simulator rendering an interactive Canvas 2D / WebGL surface.
* **Input Emulation:** Visitors can navigate using keyboard arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Enter`, `Backspace`) or by clicking an interactive on-screen TV remote control.
* **Live Performance HUD:** Displays real-time rendering statistics (FPS, draw call count, simulated memory footprint) illustrating deep systems awareness.
