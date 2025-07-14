import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import AppRoutes from "./AppRoutes"; // 👈 New component below

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}

export default App;
