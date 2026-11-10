import { motion } from 'framer-motion'
import { STRUCTURES } from '../data/structures'
import StructureCard from './StructureCard'

/**
 * Tableau de bord — message personnalisé + grille de structures.
 */
export default function Dashboard({ userName, onSelectStructure, onReset }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-slate-50 sm:text-4xl"
            >
              Bonjour {userName} ! 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-2 max-w-xl text-slate-400"
            >
              Choisis une structure de données à explorer. Chaque carte raconte
              une histoire animée pour comprendre le concept.
            </motion.p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="self-start rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
          >
            Changer de prénom
          </button>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STRUCTURES.map((structure, index) => (
            <StructureCard
              key={structure.id}
              structure={structure}
              index={index}
              onSelect={onSelectStructure}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
