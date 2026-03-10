import { useState } from 'react'
import FrenchDrill from './FrenchDrill.jsx'
import alphabetData from './data/alphabet.json'

const LETTER_GROUPS = alphabetData.letterGroups
const NUMBERS = alphabetData.numbers

const SPEECH_RATE = 0.8

// Preferred French voices in order of quality
const PREFERRED_VOICES = [
  'Google français',
  'Amélie',
  'Thomas',
  'Virginie',
  'Audrey',
]

function getBestFrenchVoice() {
  const voices = window.speechSynthesis.getVoices()
  const frenchVoices = voices.filter(v => v.lang.startsWith('fr'))
  for (const name of PREFERRED_VOICES) {
    const match = frenchVoices.find(v => v.name === name)
    if (match) return match
  }
  return frenchVoices[0] ?? null
}

function speak(text, key, setSpeakingKey) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel()
  }
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'fr-FR'
  utterance.rate = SPEECH_RATE
  utterance.voice = getBestFrenchVoice()
  utterance.onstart = () => setSpeakingKey(key)
  utterance.onend = () => setSpeakingKey(null)
  utterance.onerror = () => setSpeakingKey(null)
  window.speechSynthesis.speak(utterance)
}

function ItemButton({ label, text, speakingKey, setSpeakingKey }) {
  const speaking = speakingKey === label

  function handleClick() {
    speak(text, label, setSpeakingKey)
  }

  return (
    <button
      className={`item-button${speaking ? ' speaking' : ''}`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('letters')
  const [speakingKey, setSpeakingKey] = useState(null)
  const speechSupported = 'speechSynthesis' in window

  if (activeTab === 'verbos') {
    return <FrenchDrill onTabChange={setActiveTab} />
  }

  return (
    <div className="container">
      <h1>🇫🇷 Apprendre le Français</h1>
      <p className="subtitle">Toca cualquier letra o número para escuchar su pronunciación en francés</p>

      <div className="tabs">
        <button
          className={`tab-button${activeTab === 'letters' ? ' active' : ''}`}
          onClick={() => setActiveTab('letters')}
        >
          📝 Letras
        </button>
        <button
          className={`tab-button${activeTab === 'numbers' ? ' active' : ''}`}
          onClick={() => setActiveTab('numbers')}
        >
          🔢 Números
        </button>
        <button
          className={`tab-button${activeTab === 'verbos' ? ' active' : ''}`}
          onClick={() => setActiveTab('verbos')}
        >
          🧑 Verbos
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'letters' && (
          <div className="letter-groups">
            {LETTER_GROUPS.map((group, i) => (
              <div key={i} className="grid">
                {group.map(letter => (
                  <ItemButton key={letter} label={letter} text={letter} speakingKey={speakingKey} setSpeakingKey={setSpeakingKey} />
                ))}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'numbers' && (
          <div className="grid">
            {NUMBERS.map(num => (
              <ItemButton key={num.value} label={num.value} text={num.french} speakingKey={speakingKey} setSpeakingKey={setSpeakingKey} />
            ))}
          </div>
        )}
      </div>

      {!speechSupported && (
        <div className="error-message">
          Lo sentimos, tu navegador no soporta text-to-speech. Por favor intenta con un navegador moderno como Chrome, Firefox o Safari.
        </div>
      )}
    </div>
  )
}
