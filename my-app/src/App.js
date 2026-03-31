import "./App.css";
import Navbar from "./components/Navbar";
import TextOnPage from "./components/textOnpage";
import Alert from "./components/alerts";
import About from "./components/Abouts";
import Services from "./components/services";
import Contact from "./components/contact";
//Use useEffect when you want to load after render and *useLayouEffect* when you want to load before render with layout
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useLayoutEffect } from "react";

function App() {
  console.log(process.env.NODE_ENV);

  // const [font, setFont] = useState("black");

  const [expColor, setColBut] = useState("blue");
  const [changeStatus, setStatus] = useState(false);

  // const [panelBg, setPanel] = useState("bg-slate-100");

  const [alert, updAlert] = useState(null);
  const updAlrt = (message, type) => {
    updAlert({ msg: message, type: type });
  };
  function toggleMode() {
    const root = document.documentElement.classList;
    if (root.contains("dark")) {
      root.remove("dark");
      localStorage.setItem("theme", "");
    } else if (!root.contains("dark")) {
      root.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log("theme : ", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  });
  function onChg() {
    setStatus((prev) => (prev === true ? false : true));
    console.log("Is reaching on change");
    toggleMode();

    // setFont((prev) => (prev === "black" ? "white" : "black"));

    console.log(expColor);

    /* toggling alert message on mode change and this doesnt update until the function ends
and because this is inside the function it counts the previous value of the color
hence we use previous value to check rather than using the value that we are
setting which updates after the function is ended */
    // console.log(color, font);
    if (!document.documentElement.classList.contains("dark")) {
      updAlrt("Light Mode Enabled", "Mode Alert ");
    } else if (document.documentElement.classList.contains("dark")) {
      updAlrt("Dark Mode Enabled", "Mode Alert ");
    }
  }

  return (
    <Router>
      <div className="bg-white w-screen h-screen  text-black dark:bg-black dark:text-white">
        <div
          className="w-screen h-screen "
          // style={{ background: color, color: font }}
        >
          <Navbar
            title={"Candlewood Assosiation"}
            // color={color}
            onChg={onChg}
            // colorS={color}
            // fontS={font}
            expState={setColBut}
            mode={localStorage.getItem("theme")}
            ButBg={expColor}
            // ringCol={font}
            // bgPanel={panelBg}
          />
          <Alert Alert={alert} alertTransp={0.55} currStatus={changeStatus} />

          <Routes>
            <Route
              to="/"
              index
              element={
                <TextOnPage /*color={color} font={font}*/ colorBut={expColor} />
              }
            />
            <Route path="/" element={<Navigate to="/" replace end />} />
            <Route path="/About" element={<About />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact colorBut={expColor} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

console.log("This is the use of ES7 extension");
export default App;
