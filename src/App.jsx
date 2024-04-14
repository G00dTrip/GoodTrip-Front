import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpDown } from "@fortawesome/free-solid-svg-icons";
library.add(faUpDown);
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Planning from "./pages/Planning/Planning";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/planning" element={<Planning />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
