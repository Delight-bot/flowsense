import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, Sparkles, KeyRound } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { starterPrompts, SYSTEM_PROMPT } from '../data/biomarkers.js'

const MODEL = 'claude-sonnet-4-6'

export default function Chat() {
  const { chatHistory, setChatHistory, apiKey, saveApiKey } = useApp()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [keyDraft, setKeyDraft] = useState('')
  const [params] = useSearchParams()
  const scrollRef = useRef(null)
  const prefilled = useRef(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [chatHistory, loading])

  // Pre-fill from body map "Ask OvaAI about this"
  useEffect(() => {
    const q = params.get('q')
    if (q && !prefilled.current) {
      prefilled.current = true
      setInput(q)
    }
  }, [params])

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    if (!apiKey) {
      setError('Add your Anthropic API key below to chat with OvaAI.')
      return
    }
    setError('')
    setInput('')

    const nextHistory = [...chatHistory, { role: 'user', content }]
    setChatHistory(nextHistory)
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: nextHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        throw new Error(errBody?.error?.message || `Request failed (${res.status})`)
      }

      const data = await res.json()
      const reply = data.content?.map((c) => c.text).join('') || '…'
      setChatHistory([...nextHistory, { role: 'assistant', content: reply }])
    } catch (e) {
      setError(e.message || 'Something went wrong.')
      setChatHistory(nextHistory)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col px-4 pt-6 lg:h-full">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose to-orchid shadow-glow-mint">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold">OvaAI</h1>
          <p className="text-xs text-muted">Your hormone intelligence companion</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-4 overflow-y-auto pb-4">
        {chatHistory.length === 0 && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-card p-4 text-sm leading-relaxed text-white/90 shadow-glow">
              Hi! I'm OvaAI. I've read today's Flow sync and I'm here to help you make sense of
              your hormones. Ask me anything, or tap a starter below.
            </div>
            <div className="flex flex-col gap-2">
              {starterPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="rounded-xl bg-cardAlt px-4 py-3 text-left text-sm text-muted transition hover:bg-orchid/30 hover:text-white"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatHistory.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-rose to-orchid text-white'
                  : 'bg-card text-white/90 shadow-glow'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-1.5 rounded-2xl bg-card px-4 py-4 shadow-glow">
              <span className="typing-dot h-2 w-2 rounded-full bg-blush" />
              <span className="typing-dot h-2 w-2 rounded-full bg-blush" style={{ animationDelay: '0.2s' }} />
              <span className="typing-dot h-2 w-2 rounded-full bg-blush" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}

        {error && <p className="text-center text-xs text-rose">{error}</p>}
      </div>

      {/* API key entry (only when missing) */}
      {!apiKey && (
        <div className="mb-3 rounded-2xl bg-cardAlt p-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs text-muted">
            <KeyRound size={13} /> Anthropic API key (stored locally only)
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              placeholder="sk-ant-…"
              className="flex-1 rounded-lg bg-bg px-3 py-2 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-orchid"
            />
            <button
              onClick={() => keyDraft.trim() && saveApiKey(keyDraft.trim())}
              className="rounded-lg bg-orchid px-4 py-2 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="flex items-center gap-2 pb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask OvaAI about your hormones…"
          className="flex-1 rounded-full bg-card px-5 py-3 text-sm text-white placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orchid"
        />
        <button
          onClick={() => send()}
          disabled={loading}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose to-orchid text-white shadow-glow-mint transition hover:scale-105 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
