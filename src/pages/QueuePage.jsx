import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'

const RIDERS = ['🧒', '👩', '🧑', '👴', '👸', '🦸', '🧙', '🐶']

/**
 * Page Queue — file du parc d'attraction (FIFO).
 * Enqueue à la fin, Dequeue au début.
 */
export default function QueuePage({ userName, onBack }) {
  const [queue, setQueue] = useState([])
  const [nextId, setNextId] = useState(1)
  const [log, setLog] = useState('Fais entrer quelqu’un dans la file !')

  const enqueue = () => {
    if (queue.length >= 7) {
      setLog('File pleine (max 7) — laisse passer quelqu’un !')
      return
    }
    const item = {
      id: nextId,
      avatar: RIDERS[(nextId - 1) % RIDERS.length],
      label: `P${nextId}`,
    }
    setQueue((prev) => [...prev, item])
    setNextId((n) => n + 1)
    setLog(`enqueue(${item.label}) → rejoint la fin de la file`)
  }

  const dequeue = () => {
    if (queue.length === 0) {
      setLog('La file est vide — personne à faire monter.')
      return
    }
    const first = queue[0]
    setQueue((prev) => prev.slice(1))
    setLog(`dequeue() → ${first.label} monte dans le manège (FIFO)`)
  }

  const front = () => {
    if (queue.length === 0) {
      setLog('front() → file vide')
      return
    }
    setLog(`front() → prochain = ${queue[0].label} (sans le retirer)`)
  }

  return (
    <PageLayout userName={userName} title="Queue — File du parc" emoji="🎢" onBack={onBack}>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Animation interactive
          </h2>

          <div className="mb-6 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
              <span>🚪 Entrée manège</span>
              <span>Fin de file →</span>
            </div>

            <div className="flex min-h-[100px] items-center gap-2 overflow-x-auto pb-2">
              <div className="flex shrink-0 flex-col items-center gap-1">
                <span className="text-3xl">🎢</span>
                <span className="text-[10px] text-purple-400">OUT</span>
              </div>

              <div className="h-12 w-px shrink-0 bg-slate-700" />

              <div className="flex flex-1 items-center gap-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {queue.map((person, index) => (
                    <motion.div
                      key={person.id}
                      layout
                      initial={{ opacity: 0, x: 40, scale: 0.7 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -60, scale: 0.5 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                      className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-slate-700 bg-slate-800 px-2 py-2"
                    >
                      <span className="text-2xl">{person.avatar}</span>
                      <span className="mt-1 text-[10px] font-mono text-indigo-300">
                        {person.label}
                      </span>
                      {index === 0 && (
                        <span className="mt-0.5 text-[9px] text-emerald-400">front</span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {queue.length === 0 && (
                  <p className="text-sm text-slate-600">File vide…</p>
                )}
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-slate-500">
              Premier arrivé = premier servi · {queue.length} personne(s)
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton onClick={enqueue} label="Enqueue (+)" color="purple" />
            <ActionButton onClick={dequeue} label="Dequeue (−)" color="rose" />
            <ActionButton onClick={front} label="Front" color="slate" />
          </div>

          <p className="mt-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-purple-300">
            {log}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-100">FIFO expliqué</h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            Une <strong className="text-slate-200">Queue</strong> est une file d’attente : on
            entre par la <em>fin</em>, on sort par le <em>début</em>. Fair-play garanti —
            <strong className="text-purple-300">First In, First Out</strong>.
          </p>

          <CodeBlock
            title="Pseudo-code"
            code={`class Queue {
  enqueue(item) // ajoute à la fin
  dequeue()     // retire du début
  front()       // lit le premier
  isEmpty()
}`}
          />

          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>• Files d’impression</li>
            <li>• File d’attente messages / API</li>
            <li>• BFS (parcours en largeur)</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  )
}

function ActionButton({ onClick, label, color }) {
  const styles = {
    purple: 'bg-purple-600 hover:bg-purple-500 text-white',
    rose: 'bg-rose-600/90 hover:bg-rose-500 text-white',
    slate: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
  }
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${styles[color]}`}
    >
      {label}
    </motion.button>
  )
}

function CodeBlock({ title, code }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-left text-xs leading-relaxed text-indigo-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}
