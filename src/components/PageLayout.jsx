import { motion } from 'framer-motion'

/**
 * Layout partagé pour les pages de structures (retour + prénom + zone contenu).
 */
export default function PageLayout({ userName, title, emoji, onBack, children }) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-500 hover:text-white"
          >
            ← Retour au Dashboard
          </button>

          <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-1.5 text-sm text-slate-300">
            Joueur : <span className="font-semibold text-indigo-300">{userName}</span>
          </span>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-50 sm:text-3xl">
            <span className="text-3xl" role="img" aria-hidden>
              {emoji}
            </span>
            {title}
          </h1>

          {children}
        </motion.div>
      </div>
    </div>
  )
}
