import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "rc-pagination/assets/index.css"
import { AuthProvider } from './contexts/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
