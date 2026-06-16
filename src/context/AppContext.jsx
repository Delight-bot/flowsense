import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [profile, setProfile] = useState({
    name: '',
    ageRange: '',
    cycleRegularity: '',
    symptoms: [],
    goals: [],
  })
  const [connected, setConnected] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [logStreak, setLogStreak] = useState(0)
  // Build-time key (injected via VITE_ANTHROPIC_API_KEY / GitHub Actions secret)
  // takes priority so the demo works with no setup. Falls back to a key the
  // visitor enters locally. NOTE: an embedded key IS visible in the bundle.
  const envKey = import.meta.env.VITE_ANTHROPIC_API_KEY || ''
  const [apiKey, setApiKey] = useState(
    () => envKey || localStorage.getItem('flowsense_api_key') || ''
  )

  const updateProfile = (patch) => setProfile((p) => ({ ...p, ...patch }))

  const toggleSymptom = (symptom) =>
    setProfile((p) => ({
      ...p,
      symptoms: p.symptoms.includes(symptom)
        ? p.symptoms.filter((s) => s !== symptom)
        : [...p.symptoms, symptom],
    }))

  const toggleGoal = (goal) =>
    setProfile((p) => ({
      ...p,
      goals: p.goals.includes(goal)
        ? p.goals.filter((g) => g !== goal)
        : [...p.goals, goal],
    }))

  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('flowsense_api_key', key)
  }

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        toggleSymptom,
        toggleGoal,
        connected,
        setConnected,
        chatHistory,
        setChatHistory,
        logStreak,
        setLogStreak,
        apiKey,
        saveApiKey,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
