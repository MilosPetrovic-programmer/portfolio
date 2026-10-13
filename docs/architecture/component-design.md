# Component Design & UI Architecture

> **Document ID:** DOC-ARCH-002  
> **Status:** Approved  
> **Role:** Component Engineering Guidelines & Patterns

---

## 1. Component Philosophy & Hierarchy

The component architecture follows a **hybrid Atomic & Feature-Sliced** structure. Components are categorized by their reusability and domain specificity:

```
src/components/
├── common/             # Primitive UI building blocks (Atoms & Molecules)
│   ├── Button/         # Polymorphic accessible buttons
│   ├── Card/           # Content containers with standardized padding
│   ├── Modal/          # Accessible dialog with focus trap
│   ├── Badge/          # Status & category pills
│   └── Input/          # Accessible text fields, selects, and switches
├── layout/             # Application scaffolding (Organisms & Templates)
│   ├── Navbar/         # Primary responsive navigation
│   ├── Footer/         # Metadata, credits, and link matrix
│   └── SectionShell/   # Standardized section padding, headers, and container constraints
├── showcase/           # Domain-specific interactive features
│   ├── eduscheduler/   # Interactive classroom scheduling components
│   │   ├── CalendarGrid.tsx
│   │   ├── TimeSlotCell.tsx
│   │   ├── ConflictWarningBanner.tsx
│   │   └── ReservationDetailsDrawer.tsx
│   └── tv-emulator/    # Smart TV LightningJS emulator components
│       ├── TVFrame.tsx
│       ├── TVRemoteControl.tsx
│       └── CanvasViewport.tsx
```

---

## 2. Design Patterns & Best Practices

### 2.1. Compound Component Pattern
For complex UI elements with tightly coupled sub-elements (e.g., Modals, Dropdowns, Tabs), compound components provide flexible JSX composition without prop-drilling:

```tsx
// ✅ Example: Compound Tabs Pattern
export interface TabsProps {
  readonly activeTab: string;
  readonly onTabChange: (tabId: string) => void;
  readonly children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> & {
  List: React.FC<{ children: React.ReactNode; className?: string }>;
  Trigger: React.FC<{ value: string; children: React.ReactNode; className?: string }>;
  Content: React.FC<{ value: string; children: React.ReactNode; className?: string }>;
} = ({ activeTab, onTabChange, children }) => {
  return (
    <TabsContext.Provider value={{ activeTab, onTabChange }}>
      <div className="flex flex-col w-full">{children}</div>
    </TabsContext.Provider>
  );
};
```

### 2.2. Strict Separation of Presentation & Logic
* **Presentation Components:** Pure functions of their props. They do not initiate HTTP queries, parse complex domain rules, or mutate browser globals.
* **Smart Containers:** Thin wrappers that invoke domain hooks and pass the resulting data and event handlers into pure presentation components:

```tsx
// ❌ REJECTED: Mixed presentation and business logic
export const BadBookingView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/reservations').then(res => res.json()).then(setData);
  }, []);
  // ... 200 lines of mixed rendering and math
};

// ✅ APPROVED: Clear separation
export const BookingContainer: React.FC = () => {
  const { slots, isPending, conflict, handleBookSlot } = useEduScheduler();

  if (isPending) return <BookingSkeletonLoader />;
  if (conflict) return <ConflictAlert conflict={conflict} />;

  return <BookingGrid slots={slots} onBookSlot={handleBookSlot} />;
};
```

---

## 3. Accessibility Standards (WCAG 2.1 AA)

Accessibility is treated as a first-class architectural requirement, not an afterthought:

1. **Semantic HTML:** Use native elements (`<nav>`, `<main>`, `<article>`, `<button>`, `<dialog>`) instead of generic `<div>` trees with click handlers.
2. **Keyboard Navigation:**
   - All interactive elements must be focusable with the `Tab` key.
   - Active focus rings must be visible and contrast-compliant: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`.
   - Modals and drawers must lock keyboard focus inside the dialog using an accessible focus trap and dismiss on `Escape`.
3. **ARIA Roles & States:**
   - Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="dialog-title"`.
   - Collapsibles: `aria-expanded={isOpen}`, `aria-controls="panel-id"`.
   - Dynamic Announcements: Live regions (`aria-live="polite"`) for booking conflict alerts and asynchronous state changes.
4. **Color Contrast:**
   - Minimum text contrast ratio of **4.5:1** for normal text and **3:1** for large text against background tokens in both light and dark themes.

---

## 4. Performance & Rendering Budgets

* **Component Size Budget:** Max 150 lines per component file.
* **Render Optimization:**
  - Prevent inline object or array literals in frequently updated props.
  - Wrap hot collection items in `React.memo` only when profiling demonstrates measurable re-render bottlenecks.
  - Utilize virtualized scrolling (`@tanstack/react-virtual`) if calendar day views exceed 100 simultaneous event blocks.
* **Canvas Isolation:** The Smart TV canvas engine runs within an isolated `<canvas>` context decoupled from the React virtual DOM tree, avoiding unnecessary React reconciliation cycles during 60 FPS animation ticks.
