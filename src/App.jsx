import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login, Register } from "pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
