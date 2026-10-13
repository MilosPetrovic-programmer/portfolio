# Machine Learning & AI Systems Integration Architecture

> **Document ID:** DOC-ML-001  
> **Status:** Approved  
> **Role:** AI/ML Capabilities, Semantic Search & Interactive Technical Dossier Blueprint

---

## 1. Vision & Architectural Role

As an innovative Senior Frontend Architect and Systems Engineer, incorporating machine learning capabilities into the portfolio provides a concrete demonstration of forward-looking AI integration.

The AI integration layer is designed not as a generic chat wrapper, but as an **embedded Technical Dossier Intelligence System**:
1. **Semantic Project & Architectural Search:** Enables engineering recruiters and hiring managers to execute semantic queries against technical case studies, ADRs, and source code patterns (e.g., *"Show me how race conditions were resolved in EduScheduler"* or *"How was texture memory recycled in LightningJS?"*).
2. **Interactive AI Technical Assistant:** A streamed conversational interface grounded strictly in the portfolio's architectural documentation, ensuring 100% truthful, hallucination-free technical responses.
3. **Defensive Edge & Client Architecture:** Zero degradation of Core Web Vitals, graceful offline fallbacks, and strict input/output sanitization.

---

## 2. System Architecture

```mermaid
flowchart TD
    subgraph Client["Browser Frontend"]
        QueryInput["Visitor Natural Language Query"] --> QueryHook["useDossierAssistant (Streaming Hook)"]
        QueryHook --> AbortCtl["AbortController & State Machine"]
        StreamParser["SSE Stream Parser (Discriminated Union)"] --> UI["DossierResponseView (Sanitized Markdown)"]
    end

    subgraph Edge["Edge AI Gateway (Cloudflare Worker / Vercel Edge)"]
        RateLimiter["Rate Limiting & Abuse Protection"]
        PromptGuard["Prompt Injection & Grounding Sanitizer"]
        RAGIndex["Vector Store / RAG Context (ADRs, Docs, Metrics)"]
        LLM["Inference Engine (Claude 3.5 / GPT-4o-mini / Gemini Flash)"]
    end

    AbortCtl --> RateLimiter
    RateLimiter --> PromptGuard
    PromptGuard --> RAGIndex
    RAGIndex --> LLM
    LLM -->|Streamed Tokens (SSE)| StreamParser
```

---

## 3. Key Components & Implementation

### 3.1. Vector Embeddings & Semantic Retrieval (RAG)
To provide instant semantic search without external runtime dependencies:
* **Pre-computed Embeddings:** During the build step, Markdown files in `docs/` and project case studies are chunked, embedded via text embeddings (e.g., `text-embedding-3-small`), and indexed.
* **Hybrid Search:** Combines BM25 keyword matching with cosine similarity vector retrieval to ensure technical terms (like `_focus`, `LightningJS`, `409 Conflict`, `PSR-12`) match with 100% precision.

### 3.2. Asynchronous Streaming Hook Pattern (`useDossierAssistant`)
Adhering to our 3-tier architecture, AI interactions are encapsulated in a typed custom hook:

```typescript
import { useState, useCallback, useRef } from 'react';
import type { RemoteData } from '@/types/system';

export interface ChatMessage {
  readonly id: string;
  readonly role: 'user' | 'assistant';
  readonly content: string;
  readonly timestamp: number;
}

export interface UseDossierAssistantReturn {
  readonly messages: readonly ChatMessage[];
  readonly streamingState: RemoteData<string>;
  readonly askQuestion: (query: string) => Promise<void>;
  readonly cancelStream: () => void;
}

export function useDossierAssistant(): UseDossierAssistantReturn {
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [streamingState, setStreamingState] = useState<RemoteData<string>>({
    status: 'idle',
    data: null,
    error: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelStream = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setStreamingState({ status: 'idle', data: null, error: null });
    }
  }, []);

  const askQuestion = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) return;
    cancelStream();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setStreamingState({ status: 'loading', data: null, error: null });

    try {
      // In production, connects to edge streaming endpoint; supports offline fallback
      const response = await fetch('/api/dossier-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat API error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setStreamingState({ status: 'success', data: accumulated, error: null });
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: accumulated,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const error = err instanceof Error ? err : new Error('Stream failed');
      setStreamingState({ status: 'error', data: null, error });
    }
  }, [cancelStream]);

  return { messages, streamingState, askQuestion, cancelStream };
}
```

---

## 4. Guardrails & Defensive Measures

1. **System Prompt Grounding:** The assistant's system prompt instructs it to only answer questions using the factual context provided in `docs/` and project specifications. Hallucinations are strictly penalized.
2. **Offline Fallback Matrix:** If the visitor is offline or third-party AI services are unreachable, the UI gracefully switches to an instant static FAQ search mode that runs entirely in the browser.
3. **Zero PII Exposure:** No user telemetry or chat transcripts are persisted or shared with external analytics.
4. **Output Sanitization:** Markdown output generated by the AI is strictly parsed through AST sanitization to neutralize any attempted script injections (XSS).
