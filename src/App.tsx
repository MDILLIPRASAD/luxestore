import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Index from "./pages/Index"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Index />
        <Toaster />
      </Router>
    </AuthProvider>
  )
}

export default App