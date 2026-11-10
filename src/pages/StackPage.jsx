import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'

const FLAVORS = [
  {
    name: 'Maple',
    batter: 'from-amber-300 via-amber-400 to-orange-500',
    rim: 'border-amber-700/50',
    topping: '🧈',
    toppingName: 'Beurre salé',
  },
  {
    name: 'Blueberry',
    batter: 'from-yellow-300 via-amber-400 to-orange-400',
    rim: 'border-amber-800/40',
    topping: '🫐',
    toppingName: 'Myrtilles',
  },
  {
    name: 'Chocolate',
    batter: 'from-yellow-400 via-amber-500 to-orange-600',
    rim: 'border-orange-900/40',
    topping: '🍫',
    toppingName: 'Pépites de chocolat',
  },
  {
    name: 'Banana',
    batter: 'from-amber-200 via-yellow-400 to-amber-500',
    rim: 'border-yellow-700/40',
    topping: '🍌',
    toppingName: 'Banane caramel',
  },
  {
    name: 'Strawberry',
    batter: 'from-amber-300 via-orange-400 to-rose-400',
    rim: 'border-rose-800/30',
    topping: '🍓',
    toppingName: 'Fraise & sirop',
  },
  {
    name: 'Honey',
    batter: 'from-yellow-200 via-amber-300 to-yellow-500',
    rim: 'border-amber-600/50',
    topping: '🍯',
    toppingName: 'Miel doré',
  },
]

const MAX_STACK = 8

/**
 * Page Stack — cuisine du chef, pile de pancakes (LIFO).
 * Push ajoute au sommet, Pop retire le dernier ajouté, Peep lit le sommet en O(1).
 */
export default function StackPage({ userName, onBack }) {
  const [stack, setStack] = useState([])
  const [nextId, setNextId] = useState(1)
  const [log, setLog] = useState('Le chef attend un pancake… PUSH pour empiler !')
  const [peepOpen, setPeepOpen] = useState(false)
  const [emptyCue, setEmptyCue] = useState(false)
  const [shakePlate, setShakePlate] = useState(false)

  const top = stack.length > 0 ? stack[stack.length - 1] : null

  const push = () => {
    if (stack.length >= MAX_STACK) {
      setLog(`La tour est trop haute (max ${MAX_STACK}) — POP d’abord !`)
      setEmptyCue(false)
      return
    }
    const flavor = FLAVORS[(nextId - 1) % FLAVORS.length]
    const item = {
      id: nextId,
      label: `#${nextId}`,
      value: nextId,
      flavor: flavor.name,
      toppingName: flavor.toppingName,
      topping: flavor.topping,
      batter: flavor.batter,
      rim: flavor.rim,
      pushedAt: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }
    setStack((prev) => [...prev, item])
    setNextId((n) => n + 1)
    setLog(`PUSH(${item.label}) → ${item.flavor} posé au sommet (LIFO)`)
    setEmptyCue(false)
    setPeepOpen(false)
  }

  const pop = () => {
    if (stack.length === 0) {
      setLog('POP() → pile vide. Rien à servir !')
      setEmptyCue(true)
      setShakePlate(true)
      window.setTimeout(() => setShakePlate(false), 500)
      setPeepOpen(false)
      return
    }
    const removed = stack[stack.length - 1]
    setStack((prev) => prev.slice(0, -1))
    setLog(`POP() → ${removed.label} (${removed.flavor}) servi — dernier entré, premier sorti`)
    setEmptyCue(false)
    setPeepOpen(false)
  }

  const peep = () => {
    if (stack.length === 0) {
      setLog('PEEP() → pile vide. Aucun sommet à inspecter.')
      setEmptyCue(true)
      setPeepOpen(false)
      return
    }
    setEmptyCue(false)
    setPeepOpen((open) => !open)
    const current = stack[stack.length - 1]
    setLog(`PEEP() → sommet = ${current.label} · ${current.flavor} (O(1), sans retirer)`)
  }

  const reset = () => {
    setStack([])
    setNextId(1)
    setPeepOpen(false)
    setEmptyCue(false)
    setLog('RESET() → assiette vide. La pile est à zéro.')
  }

  return (
    <PageLayout userName={userName} title="Stack — La cuisine du chef" emoji="🥞" onBack={onBack}>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="relative overflow-hidden rounded-2xl border border-amber-900/40 bg-slate-900 p-5 shadow-xl shadow-amber-950/20 sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-24 left-0 h-40 w-40 rounded-full bg-orange-600/10 blur-3xl"
          />

          <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-200/80">
              Cuisine interactive
            </h2>
            <motion.p
              key={stack.length}
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-widest text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.25)]"
            >
              THE STACK: {stack.length} ELEMENTS
            </motion.p>
          </div>

          {/* Scène cuisine */}
          <div className="relative mb-5 overflow-visible rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-stone-950">
            {/* Lumières cuisine */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-amber-400/10 to-transparent"
            />
            <div
              aria-hidden
              className="absolute left-6 top-3 h-2 w-16 rounded-full bg-amber-300/40 blur-[2px]"
            />
            <div
              aria-hidden
              className="absolute right-10 top-4 h-2 w-10 rounded-full bg-orange-300/30 blur-[2px]"
            />

            <div className="relative flex min-h-[380px] flex-col">
              <AnimatePresence>
                {peepOpen && top && (
                  <div className="absolute left-1/2 top-3 z-30 w-52 -translate-x-1/2 sm:hidden">
                    <ThoughtBubble pancake={top} height={stack.length} compact />
                  </div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {emptyCue && stack.length === 0 && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-20 z-30 flex justify-center">
                    <EmptyCue />
                  </div>
                )}
              </AnimatePresence>

              <div className="flex flex-1 items-end justify-center gap-3 px-3 pb-0 pt-6 sm:gap-6">
                {/* Chef + bulle PEEP */}
                <div className="relative mb-16 hidden w-28 shrink-0 sm:block">
                  <AnimatePresence>
                    {peepOpen && top && (
                      <ThoughtBubble key={top.id} pancake={top} height={stack.length} />
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={
                      peepOpen
                        ? { y: [0, -4, 0], rotate: [0, -3, 3, 0] }
                        : { y: 0, rotate: 0 }
                    }
                    transition={{ duration: 1.6, repeat: peepOpen ? Infinity : 0 }}
                    className="text-center"
                  >
                    <span className="block text-6xl drop-shadow-lg" role="img" aria-label="chef">
                      👨‍🍳
                    </span>
                    <span className="mt-1 inline-block rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                      Chef LIFO
                    </span>
                  </motion.div>
                </div>

                {/* Pile + assiette */}
                <motion.div
                  animate={shakePlate ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex w-full max-w-xs flex-col items-center"
                >
                  <div className="flex min-h-[240px] w-full flex-col items-center justify-end">
                    <AnimatePresence initial={false}>
                      {[...stack].reverse().map((item, visualIndex) => {
                        const isTop = visualIndex === 0
                        return (
                          <Pancake
                            key={item.id}
                            item={item}
                            isTop={isTop}
                            highlighted={peepOpen && isTop}
                            zIndex={stack.length - visualIndex}
                          />
                        )
                      })}
                    </AnimatePresence>
                  </div>

                  <Plate />
                </motion.div>
              </div>

              {/* Table */}
              <div className="relative h-14">
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-amber-800 to-amber-950 shadow-[0_-8px_24px_rgba(0,0,0,0.45)]" />
                <div className="absolute inset-x-0 top-4 bottom-0 bg-gradient-to-b from-stone-900 to-stone-950" />
                <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-amber-600/40" />
                <p className="relative z-10 pt-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-amber-700/80">
                  Kitchen table · LIFO
                </p>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-4">
            <GlowButton onClick={push} label="PUSH" hint="+ pancake" color="amber" />
            <GlowButton onClick={pop} label="POP" hint="− sommet" color="rose" />
            <GlowButton
              onClick={peep}
              label="PEEP"
              hint="O(1) sommet"
              color="sky"
              active={peepOpen}
            />
            <GlowButton onClick={reset} label="RESET" hint="vider" color="slate" />
          </div>

          <p className="mt-4 rounded-xl border border-amber-900/40 bg-slate-950/80 px-3 py-2 font-mono text-xs text-amber-200">
            {log}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-100">LIFO expliqué</h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            Une <strong className="text-slate-200">Stack</strong> fonctionne comme une pile de
            pancakes dans l’assiette du chef : on ajoute et on retire toujours par le{' '}
            <em>sommet</em>. Le dernier pancake posé est le premier servi —{' '}
            <strong className="text-amber-300">Last In, First Out</strong>.
          </p>

          <CodeBlock
            title="Pseudo-code"
            code={`class Stack {
  push(item)  // ajoute au sommet
  pop()       // retire le sommet
  peep()      // lit le sommet O(1)
  isEmpty()   // true si vide
  reset()     // vide la pile
}`}
          />

          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>• Undo / Ctrl+Z dans un éditeur</li>
            <li>• Historique de navigation (retour arrière)</li>
            <li>• Appels de fonctions (call stack)</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  )
}

function Pancake({ item, isTop, highlighted, zIndex }) {
  const width = isTop ? 'w-44' : 'w-40'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -70, scale: 0.55, rotate: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: highlighted ? 1.06 : 1,
        rotate: 0,
        filter: highlighted
          ? 'drop-shadow(0 0 12px rgba(56,189,248,0.7))'
          : 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))',
      }}
      exit={{
        opacity: 0,
        x: 90,
        y: -36,
        rotate: 28,
        scale: 0.7,
        transition: { duration: 0.35, ease: 'easeIn' },
      }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className={`relative -mb-2 flex h-11 ${width} items-center justify-center rounded-[999px] border-2 bg-gradient-to-b ${item.batter} ${item.rim} ${
        highlighted ? 'ring-2 ring-sky-300 ring-offset-2 ring-offset-slate-950' : ''
      }`}
      style={{ zIndex }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-1 h-2 rounded-full bg-white/35"
      />
      <span className="relative z-10 text-sm font-black tracking-wide text-amber-950 drop-shadow-sm">
        {item.topping} {item.label}
      </span>
      {isTop && (
        <span className="absolute -right-2 -top-2 rounded-full bg-sky-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white shadow-lg shadow-sky-500/40">
          TOP
        </span>
      )}
    </motion.div>
  )
}

function Plate() {
  return (
    <div className="relative z-0 mt-1 flex flex-col items-center">
      <div className="h-3 w-52 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 shadow-inner" />
      <div className="-mt-1 h-2 w-40 rounded-b-full bg-slate-500/80" />
      <div className="mt-1 h-1.5 w-28 rounded-full bg-black/40 blur-[2px]" />
    </div>
  )
}

function ThoughtBubble({ pancake, height, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 8 }}
      className={
        compact
          ? 'relative z-20 w-full'
          : 'absolute left-1/2 bottom-full z-20 mb-1 w-44 -translate-x-1/2'
      }
    >
      <div className="rounded-2xl border border-sky-300/50 bg-slate-50 px-3 py-2.5 text-left shadow-[0_0_24px_rgba(56,189,248,0.35)]">
        <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
          PEEP · O(1)
        </p>
        <p className="mt-1 text-sm font-black text-slate-900">
          {pancake.topping} {pancake.label} · {pancake.flavor}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-600">{pancake.toppingName}</p>
        <p className="mt-1 font-mono text-[10px] text-slate-500">
          value={pancake.value} · index={height - 1}
        </p>
        <p className="text-[10px] text-slate-400">push @ {pancake.pushedAt}</p>
      </div>
      <div className="ml-10 h-3 w-3 rounded-full bg-slate-50" />
      <div className="ml-14 h-2 w-2 rounded-full bg-slate-50" />
    </motion.div>
  )
}

function EmptyCue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      className="mt-2 rounded-full border border-rose-400/40 bg-rose-500/15 px-3 py-1 text-[11px] font-semibold text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.25)]"
    >
      Assiette vide — rien à POP !
    </motion.div>
  )
}

function GlowButton({ onClick, label, hint, color, active = false }) {
  const styles = {
    amber:
      'border-amber-400/40 bg-amber-500/20 text-amber-100 shadow-amber-500/30 hover:bg-amber-400/30 hover:shadow-amber-400/50',
    rose: 'border-rose-400/40 bg-rose-500/20 text-rose-100 shadow-rose-500/30 hover:bg-rose-400/30 hover:shadow-rose-400/50',
    sky: 'border-sky-400/40 bg-sky-500/20 text-sky-100 shadow-sky-500/30 hover:bg-sky-400/30 hover:shadow-sky-400/50',
    slate:
      'border-slate-500/40 bg-slate-700/40 text-slate-100 shadow-slate-500/20 hover:bg-slate-600/50 hover:shadow-slate-400/30',
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-xl border px-3 py-2.5 text-center shadow-lg transition ${styles[color]} ${
        active ? 'ring-2 ring-sky-300 ring-offset-2 ring-offset-slate-900' : ''
      }`}
    >
      <span className="block text-sm font-black tracking-wider">{label}</span>
      <span className="block text-[10px] font-medium opacity-70">{hint}</span>
    </motion.button>
  )
}

function CodeBlock({ title, code }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-left text-xs leading-relaxed text-amber-200/90">
        <code>{code}</code>
      </pre>
    </div>
  )
}
