import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import ScrollToTop from './Components/ScrollToTop';
import Login from './Screens/Login';
import Signup from './Screens/SignUp';

function App() {

  return (
    <>
      <Router>
        <ScrollToTop />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
