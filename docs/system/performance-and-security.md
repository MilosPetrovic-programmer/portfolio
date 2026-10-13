# Performance & Security Architecture

> **Document ID:** DOC-SYS-002  
> **Status:** Active  
> **Role:** Performance Optimization & Defensive Security Standards

---

## 1. High-Performance Engineering Philosophy

Engineering high-performance web applications requires applying the rigorous discipline learned from **Smart TV development** (where memory is limited to < 512 MB and CPUs are throttled) to standard web browsers:
1. **Zero Wasted Cycles:** Eliminate redundant render passes and garbage collection pauses.
2. **Predictable Frame Budgets:** Maintain an unyielding 60 FPS (16.6ms per frame) during interactions.
3. **Lean Bundles:** Minimize initial asset weight to achieve sub-second LCP.

---

## 2. Performance Engineering Rules

### 2.1. 60 FPS Frame Budget & Animation Rules
* **GPU-Accelerated Compositing:** All visual transitions and animations must strictly utilize CSS properties that trigger GPU composition only: `transform` and `opacity`.
* **Never Animate Layout Properties:** Properties like `width`, `height`, `top`, `left`, `margin`, or `padding` trigger layout reflows and paint recalculations, dropping frames.
* **Canvas Loop Isolation:**
  - The Smart TV emulator render loop runs inside a dedicated `requestAnimationFrame` loop decoupled from React's fiber scheduler.
  - No object allocations (e.g., `new Point()`, `{ x, y }`) are allowed inside the render loop to prevent V8 / JavaScriptCore garbage collection stutters.

### 2.2. Memory Management & Texture Lifecycle (Smart TV Principles)
Inspired by LightningJS texture management rules:
* **Texture Recycling:** Canvas image textures are held in a pool with an LRU (Least Recently Used) cache eviction policy.
* **Cleanup on Unmount:** Components that mount timers, event listeners, or WebGL contexts must clean them up in their teardown hooks:
  ```typescript
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      spatialNavService.handleInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
      spatialNavService.dispose(); // Free textures and cancel RAF loops
    };
  }, []);
  ```

### 2.3. Code Splitting & Bundle Optimization
* **Route & Feature Lazy-Loading:** The EduScheduler interactive sandbox and the Smart TV canvas emulator are loaded via `React.lazy()` with suspense boundaries:
  ```tsx
  const EduSchedulerInteractive = React.lazy(() => 
    import('@/components/showcase/eduscheduler/EduSchedulerInteractive')
  );
  const SmartTVEmulator = React.lazy(() => 
    import('@/components/showcase/tv-emulator/SmartTVEmulator')
  );
  ```
* **Tree-Shaking:** Import only specific module exports (e.g., `import { Calendar } from 'lucide-react'`, never `import * as Icons from 'lucide-react'`).

---

## 3. Security Standards & Defense-in-Depth

### 3.1. Content Security Policy (CSP)
The application enforces a strict Content Security Policy delivered via HTTP response headers:

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.portfolio.domain;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
```

### 3.2. Cross-Site Scripting (XSS) Prevention
* **Zero `dangerouslySetInnerHTML`:** The use of `dangerouslySetInnerHTML` is prohibited. Markdown documents and descriptions are parsed through sanitized abstract syntax tree (AST) renderers with strict schema sanitizers.
* **Input Sanitization:** All user inputs (such as booking title fields in EduScheduler) are sanitized and validated against Zod schemas before processing.

### 3.3. Secure Storage Practices
* Sensitive tokens or credentials must never be stored in `localStorage` or `sessionStorage` in plain text.
* Authentication and role verification for demo features are stateless and run in-memory.
