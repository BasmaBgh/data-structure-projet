import { motion } from 'framer-motion'

/**
 * Carte interactive pour choisir une structure de données.
 */
export default function StructureCard({ structure, index, onSelect }) {
  const { title, emoji, description, detail, accent, borderHover } = structure

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`group flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all ${borderHover} hover:shadow-xl hover:shadow-indigo-950/40`}
    >
      <div
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-3xl shadow-lg`}
        role="img"
        aria-hidden
      >
        {emoji}
      </div>

      <h3 className="text-xl font-bold text-slate-100">{title}</h3>
      <p className="mt-1 text-sm font-medium text-indigo-300">{description}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{detail}</p>

      <motion.button
        type="button"
        onClick={() => onSelect(structure.id)}
        whileTap={{ scale: 0.97 }}
        className={`mt-6 w-full rounded-xl bg-gradient-to-r ${accent} px-4 py-2.5 text-sm font-semibold text-white opacity-90 transition group-hover:opacity-100`}
      >
        Explorer →
      </motion.button>
    </motion.article>
  )
}
