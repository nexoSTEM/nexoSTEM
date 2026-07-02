import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from './i18n'
import LandingPage from './pages/LandingPage'
import ExplorerPage from './pages/ExplorerPage'
import LessonPage from './pages/LessonPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explorar" element={<ExplorerPage />} />
            <Route path="/leccion/:id" element={<LessonPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/registro" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </I18nProvider>
  )
}
