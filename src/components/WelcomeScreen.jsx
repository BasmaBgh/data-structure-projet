import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Écran d'accueil — collecte le prénom avant de lancer l'aventure.
 */
export default function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Entre ton prénom pour commencer !')
      return
    }
    setError('')
    onStart(trimmed)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Halo décoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-6 text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            className="mb-3 inline-block text-5xl"
            role="img"
            aria-label="livre"
          >
            📚
          </motion.span>
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
            DataQuest
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Apprends les structures de données à travers des histoires animées.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstname" className="mb-1.5 block text-sm font-medium text-slate-300">
              Ton prénom
            </label>
            <input
              id="firstname"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              placeholder="Ex: Alex"
              autoFocus
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-rose-400"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:shadow-indigo-500/40"
          >
            Commencer l&apos;aventure
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
