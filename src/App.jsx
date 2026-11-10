import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import Dashboard from './components/Dashboard'
import StackPage from './pages/StackPage'
import QueuePage from './pages/QueuePage'
import LinkedListPage from './pages/LinkedListPage'

/**
 * Vues possibles de l'application (navigation par état React).
 * welcome → dashboard → stack | queue | linkedlist
 */
const VIEWS = {
  WELCOME: 'welcome',
  DASHBOARD: 'dashboard',
  STACK: 'stack',
  QUEUE: 'queue',
  LINKEDLIST: 'linkedlist',
}

export default function App() {
  const [view, setView] = useState(VIEWS.WELCOME)
  const [userName, setUserName] = useState('')

  const startAdventure = (name) => {
    setUserName(name)
    setView(VIEWS.DASHBOARD)
  }

  const goDashboard = () => setView(VIEWS.DASHBOARD)

  const resetName = () => {
    setUserName('')
    setView(VIEWS.WELCOME)
  }

  const selectStructure = (id) => {
    if (id === 'stack') setView(VIEWS.STACK)
    else if (id === 'queue') setView(VIEWS.QUEUE)
    else if (id === 'linkedlist') setView(VIEWS.LINKEDLIST)
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {view === VIEWS.WELCOME && <WelcomeScreen onStart={startAdventure} />}

        {view === VIEWS.DASHBOARD && (
          <Dashboard
            userName={userName}
            onSelectStructure={selectStructure}
            onReset={resetName}
          />
        )}

        {view === VIEWS.STACK && (
          <StackPage userName={userName} onBack={goDashboard} />
        )}

        {view === VIEWS.QUEUE && (
          <QueuePage userName={userName} onBack={goDashboard} />
        )}

        {view === VIEWS.LINKEDLIST && (
          <LinkedListPage userName={userName} onBack={goDashboard} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
