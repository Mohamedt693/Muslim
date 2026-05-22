import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './core/i18n/i18n' 
import App from './App'
import {LanguageProvider} from './contexts/LanguageContext'
import { PrayerProvider } from './contexts/PrayerContext'
import { TimerProvider } from './contexts/TimerContext'
import { AzanProvider } from './contexts/AzanContext'


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <PrayerProvider>
        <TimerProvider>
          <AzanProvider>
            <App />
          </AzanProvider>
        </TimerProvider>
      </PrayerProvider>
    </LanguageProvider>
  </StrictMode>
)