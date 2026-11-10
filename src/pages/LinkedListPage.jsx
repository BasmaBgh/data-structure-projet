import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'

const WAGONS = ['🚂', '🚃', '🚋', '🚌', '🛻', '🚚', '🚛']

/**
 * Page Linked List — train de nœuds reliés par des pointeurs.
 */
export default function LinkedListPage({ userName, onBack }) {
  const [nodes, setNodes] = useState([])
  const [nextId, setNextId] = useState(1)
  const [log, setLog] = useState('Ajoute un wagon (nœud) pour démarrer le train !')
  const [highlight, setHighlight] = useState(null)

  const append = () => {
    if (nodes.length >= 6) {
      setLog('Train trop long (max 6) — retire un nœud d’abord.')
      return
    }
    const node = {
      id: nextId,
      icon: WAGONS[nodes.length % WAGONS.length],
      label: `N${nextId}`,
    }
    setNodes((prev) => [...prev, node])
    setNextId((n) => n + 1)
    setLog(
      nodes.length === 0
        ? `head = ${node.label} → null`
        : `${nodes[nodes.length - 1].label}.next = ${node.label} → null`,
    )
  }

  const removeHead = () => {
    if (nodes.length === 0) {
      setLog('Liste vide — pas de head à retirer.')
      return
    }
    const removed = nodes[0]
    setNodes((prev) => prev.slice(1))
    setLog(
      nodes.length === 1
        ? `removeHead() → ${removed.label} retiré, head = null`
        : `removeHead() → ${removed.label} retiré, nouveau head = ${nodes[1].label}`,
    )
  }

  const traverse = async () => {
    if (nodes.length === 0) {
      setLog('traverse() → liste vide')
      return
    }
    setLog('traverse() : on suit chaque pointeur next…')
    for (let i = 0; i < nodes.length; i++) {
      setHighlight(nodes[i].id)
      setLog(`Visite ${nodes[i].label} → next = ${nodes[i + 1]?.label ?? 'null'}`)
      await wait(550)
    }
    setHighlight(null)
    setLog('Fin du parcours — on a atteint null.')
  }

  return (
    <PageLayout
      userName={userName}
      title="Linked List — Train à pointeurs"
      emoji="🚂"
      onBack={onBack}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Animation interactive
          </h2>

          <div className="mb-6 min-h-[160px] overflow-x-auto rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4">
            <div className="flex min-w-max items-center gap-1 py-4">
              {nodes.length === 0 ? (
                <p className="text-sm text-slate-600">head → null</p>
              ) : (
                <>
                  <span className="mr-2 shrink-0 rounded bg-indigo-600/20 px-2 py-1 text-[10px] font-bold uppercase text-indigo-300">
                    head
                  </span>
                  <AnimatePresence initial={false} mode="popLayout">
                    {nodes.map((node, index) => (
                      <motion.div
                        key={node.id}
                        layout
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, x: -20 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="flex items-center"
                      >
                        <motion.div
                          animate={{
                            boxShadow:
                              highlight === node.id
                                ? '0 0 0 2px rgb(167 139 250)'
                                : '0 0 0 0px transparent',
                            scale: highlight === node.id ? 1.08 : 1,
                          }}
                          className="flex flex-col items-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-2"
                        >
                          <span className="text-2xl">{node.icon}</span>
                          <span className="mt-1 font-mono text-[11px] text-violet-300">
                            {node.label}
                          </span>
                          <span className="text-[9px] text-slate-500">data</span>
                        </motion.div>

                        {/* Pointeur next */}
                        <div className="mx-1 flex items-center">
                          <motion.div
                            animate={{
                              backgroundColor:
                                highlight === node.id ? '#a78bfa' : '#475569',
                            }}
                            className="h-0.5 w-6"
                          />
                          <span
                            className={`text-xs ${
                              highlight === node.id ? 'text-violet-300' : 'text-slate-500'
                            }`}
                          >
                            →
                          </span>
                          {index === nodes.length - 1 && (
                            <span className="ml-1 font-mono text-[10px] text-slate-600">
                              null
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>
            <p className="text-center text-xs text-slate-500">
              Chaque nœud contient une valeur + un pointeur vers le suivant
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton onClick={append} label="Append (+)" color="violet" />
            <ActionButton onClick={removeHead} label="Remove head" color="rose" />
            <ActionButton onClick={traverse} label="Traverse →" color="slate" />
          </div>

          <p className="mt-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-violet-300">
            {log}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-100">Nœuds & pointeurs</h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            Une <strong className="text-slate-200">Linked List</strong> est une chaîne de
            nœuds. Chaque nœud stocke une donnée et l’adresse (<em>pointeur</em>) du suivant.
            Le premier nœud s’appelle <strong className="text-violet-300">head</strong> ; le
            dernier pointe vers <code className="text-slate-300">null</code>.
          </p>

          <CodeBlock
            title="Pseudo-code"
            code={`class Node {
  data
  next  // pointeur
}

class LinkedList {
  head
  append(value)
  removeHead()
  traverse()
}`}
          />

          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>• Insertion / suppression O(1) en tête</li>
            <li>• Taille dynamique (pas de tableau fixe)</li>
            <li>• Accès au n-ième élément en O(n)</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  )
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function ActionButton({ onClick, label, color }) {
  const styles = {
    violet: 'bg-violet-600 hover:bg-violet-500 text-white',
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
