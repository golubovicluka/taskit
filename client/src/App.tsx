import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { useContext, useState } from 'react'
import Hero from "./views/Hero/Hero"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthContext } from './providers/AuthProvider';
import ViewTasks from "./components/ViewTasks"
import NotFound from "./views/NotFound/NotFound"
import Register from "./views/Register/Register"
import Login from "./views/Login/Login"
import PleaseLogin from "./views/PleaseLogin/PleaseLogin"
import CreateTasks from "./views/CreateTask/CreateTask"

const App: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/testauth" element={auth?.isAuthenticated ? <span>USER AUTHENTICATED</span> : <p>NOT AUTHENTICATED</p>} /> */}
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/viewtasks" element={auth?.isAuthenticated ? <ViewTasks /> : <PleaseLogin />} />
        <Route path="/createtasks" element={auth?.isAuthenticated ? <CreateTasks /> : <PleaseLogin />} />
        <Route path="*" element={!auth?.isAuthenticated && <NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
