/**
 * Métadonnées des structures de données affichées sur le Dashboard.
 */
export const STRUCTURES = [
  {
    id: 'stack',
    title: 'Stack (Pile)',
    emoji: '🥞',
    description: 'Principe LIFO — Last In, First Out',
    detail: 'Comme une pile de pancakes : tu empiles en haut, tu manges en haut.',
    accent: 'from-indigo-600 to-purple-500',
    borderHover: 'hover:border-indigo-500',
  },
  {
    id: 'queue',
    title: 'Queue (File)',
    emoji: '🎢',
    description: 'Principe FIFO — First In, First Out',
    detail: 'Comme la file d’un parc d’attraction : le premier arrivé passe en premier.',
    accent: 'from-purple-600 to-fuchsia-500',
    borderHover: 'hover:border-purple-500',
  },
  {
    id: 'linkedlist',
    title: 'Linked List',
    emoji: '🚂',
    description: 'Nœuds et pointeurs mémoire',
    detail: 'Comme un train : chaque wagon pointe vers le suivant.',
    accent: 'from-violet-600 to-indigo-500',
    borderHover: 'hover:border-violet-500',
  },
]
