'use client'

import { useState } from 'react'

const field = 'h-12 w-full rounded-lg border border-line bg-surface px-3 text-text placeholder:text-muted focus:border-primary focus:outline-none'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const body = new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>).toString()
    try {
      // Posts to the static skeleton so Netlify Forms handles it (the SSR handler would otherwise intercept "/").
      const res = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return <p role="status" className="rounded-lg border border-line bg-surface p-5">Thanks! Your message has been sent. We usually reply within a few days.</p>
  }

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden"><label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">Name<input name="name" required maxLength={100} autoComplete="name" className={`${field} mt-1.5`} /></label>
        <label className="block text-sm font-medium">Email<input type="email" name="email" required maxLength={200} autoComplete="email" className={`${field} mt-1.5`} /></label>
      </div>
      <label className="block text-sm font-medium">
        Topic
        <select name="topic" className={`${field} mt-1.5`}>
          <option>General</option>
          <option>Suggest a game</option>
          <option>Report an issue</option>
          <option>Rights holder</option>
        </select>
      </label>
      <label className="block text-sm font-medium">
        Message
        <textarea name="message" required rows={6} maxLength={4000} className={`${field} mt-1.5 h-auto py-3`} />
      </label>
      {status === 'error' && <p role="alert" className="text-sm text-[#EF4444]">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
