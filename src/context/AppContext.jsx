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
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem('flowsense_api_key') || ''
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
