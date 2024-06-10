import "./App.css";
import axios from "axios";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpDown } from "@fortawesome/free-solid-svg-icons";
library.add(faUpDown);
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import Connection from "./pages/SignIn/SignIn";
import Infos from "./pages/Infos/Infos";
import Idea from "./pages/Idea/Idea";
import NewTravel from "./pages/NewTravel/NewTravel";
import MyTravels from "./pages/MyTravels/MyTravels";
import Planning from "./components/Planning/Planning";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || "");

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home token={token} />}></Route>
        <Route path="/newTravel" element={<NewTravel token={token} />}></Route>
        <Route path="/idea" element={<Idea token={token} />}></Route>
        <Route path="/infos" element={<Infos token={token} />}></Route>
        <Route
          path="/myTravels"
          element={<MyTravels token={token} setToken={setToken} />}
        ></Route>
        <Route
          path="/travel/update/:travelId"
          element={<Planning token={token} />}
        ></Route>
        <Route
          path="/signUp"
          element={<SignUp setToken={setToken} token={token} />}
        ></Route>
        <Route
          path="/signIn"
          element={<Connection setToken={setToken} token={token} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
