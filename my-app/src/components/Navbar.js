import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import icon from "./media/brush.ico";
import { NavLink, useLocation } from "react-router-dom";

function Navbar(props) {
  const [visibility, setVisibility] = useState("hidden");
  const [current, updateCurr] = useState("blue");
  const [themeSwitch, setThemeSwitch] = useState("");
  const [mobMenu, setMenu] = useState("hidden");

  const currentSwitch = (event) => {
    updateCurr(event.target.value);
  };
  // used to switch the floating theme palette off after switching pages
  useEffect(() => {
    if (themeSwitch === "hidden") {
      setVisibility("hidden");
    }
    console.log(themeSwitch);
  }, [themeSwitch]);
  const location = useLocation();
  console.log(location.pathname);
  props.expState(current);
  useEffect(() => {
    setThemeSwitch(location.pathname === "/" ? "" : "hidden");
  }, [location.pathname]);

  return (
    <div className="w-screen">
      <nav
        className="shadow-md dark:shadow-md dark:shadow-slate-900 " /* style={{ background: props.color }} */
      >
        <div className=" max-w-full mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between h-16 items-center">
            {/* Navigation Links */}
            <h3>
              <strong>{props.title}</strong>
            </h3>
            <div className="hidden md:block space-x-4 text-gray-700 font-medium">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 font-bold`
                    : `hover:text-blue-600 transition duration-200`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/About"
                end //helps exact match
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 font-bold`
                    : `hover:text-blue-600 transition duration-200`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/Services"
                end
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 font-bold`
                    : `hover:text-blue-600 transition duration-200`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/Contact"
                end
                className={({ isActive }) =>
                  isActive
                    ? `text-blue-500 font-bold`
                    : `hover:text-blue-600 transition duration-200`
                }
              >
                Contact
              </NavLink>
            </div>
            <div className="mr-4">
              <span className="select-none text-sm font-medium text-heading">
                Light
              </span>

              <label
                className="inline-flex items-center cursor-pointer"
                htmlFor="toggles"
              >
                <input
                  id="toggles"
                  type="checkbox"
                  className="sr-only peer"
                  onChange={props.onChg}
                  defaultChecked={props.mode}
                />
                <div
                  id="checkButton"
                  className="
      relative mx-3 w-9 h-5 rounded-full
      bg-gray-300 peer-checked:bg-blue-500
      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200
      after:content-[''] 
      after:absolute
        after:top-[2px]
after:left-[2px]
after:h-4
after:w-4
after:rounded-full
after:bg-white
after:transition-transform
after:transform
peer-checked:after:translate-x-[16px]
    "
                ></div>
              </label>

              <span className="select-none text-sm font-medium text-heading">
                Dark
              </span>
            </div>
            {themeSwitch !== "hidden" && (
              <div className={` hidden md:flex items-center space-x-2`}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 border rounded-md focus:outline-none dark:bg-black dark:text-white "
                />
                <button
                  className="px-3 py-1  text-white rounded-md hover:bg-blue-700 transition duration-200"
                  style={{ background: props.ButBg }}
                >
                  Search
                </button>
              </div>
            )}
            <div className="md:hidden" id="hamburger-but">
              <button
                className="text-gray-700 hover:text-blue-600 focus:outline-none "
                onClick={() => {
                  setMenu((prev) => (prev === "hidden" ? "" : "hidden"));
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className={`${themeSwitch}`}>
              <button
                onClick={() => {
                  visibility === "hidden"
                    ? setVisibility("")
                    : setVisibility("hidden");
                }}
              >
                <img src={icon} alt="color palette" />
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`${mobMenu} && md:hidden px-4 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-black dark:text-white`}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? `text-blue-500 font-bold`
                : `hover:text-blue-600 block text-gray-700 `
            }
            onClick={() => {
              setThemeSwitch("");
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive
                ? `text-blue-500 font-bold`
                : `hover:text-blue-600 block text-gray-700 hover:text-blue-600`
            }
            onClick={() => {
              setThemeSwitch("hidden");
            }}
          >
            About
          </NavLink>
          <NavLink
            to="/Services"
            className={({ isActive }) =>
              isActive
                ? `text-blue-500 font-bold`
                : `hover:text-blue-600 block text-gray-700 hover:text-blue-600`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/Contact"
            className={({ isActive }) =>
              isActive
                ? `text-blue-500 font-bold`
                : `hover:text-blue-600 block text-gray-700 hover:text-blue-600`
            }
          >
            Contact
          </NavLink>

          {/* Mobile Search */}
          <div className="mt-2 flex space-x-2 ">
            <input
              type="text"
              placeholder="Search..."
              className="flex- 1 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
            />
            <button
              style={{ background: props.ButBg }}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Go
            </button>
          </div>
        </div>
      </nav>

      <div
        id="colorTheme"
        className={`${visibility} ${themeSwitch} w-auto right-3 bg-modepanel-light dark:bg-modepanel-dark absolute bg- opacity-95 p-2 rounded-md p-4 shadow-md`}
      >
        <button
          value="yellow"
          className={`${
            current === "yellow"
              ? "ring-2 ring-slate-900 dark:ring-white ring-offset-[3px] ring-offset-modepanel-light dark:ring-offset-modepanel-dark"
              : ""
          }  colBut mr-3 w-7 h-7 bg-yellow-300 rounded-full`}
          onClick={currentSwitch}
        ></button>
        <button
          value="green"
          className={`${
            current === "green"
              ? "ring-2 ring-slate-900 dark:ring-white ring-offset-[3px] ring-offset-modepanel-light dark:ring-offset-modepanel-dark"
              : ""
          }  colBut mr-3 w-7 h-7 bg-green-600 rounded-full`}
          onClick={currentSwitch}
        ></button>
        <button
          value="grey"
          className={`${
            current === "grey"
              ? "ring-2 ring-slate-900 dark:ring-white ring-offset-[3px] ring-offset-modepanel-light dark:ring-offset-modepanel-dark"
              : ""
          }  colBut mr-3 w-7 h-7 bg-gray-500 rounded-full`}
          onClick={currentSwitch}
        ></button>
        <button
          value="pink"
          className={`${
            current === "pink"
              ? "ring-2 ring-slate-900 dark:ring-white ring-offset-[3px] ring-offset-modepanel-light dark:ring-offset-modepanel-dark"
              : ""
          } colBut mr-3 w-7 h-7 bg-pink-200 rounded-full`}
          onClick={currentSwitch}
        ></button>
        <button
          value="red"
          className={`${
            current === "red"
              ? "ring-2 ring-slate-900 dark:ring-white ring-offset-[3px] ring-offset-modepanel-light dark:ring-offset-modepanel-dark "
              : ""
          }  colBut mr-3 w-7 h-7 bg-red-500 rounded-full`}
          onClick={currentSwitch}
        ></button>
        <button
          value="blue"
          className={`${
            current === "blue"
              ? "ring-2 ring-slate-900 dark:ring-white ring-offset-[3px] ring-offset-modepanel-light dark:ring-offset-modepanel-dark "
              : ""
          }  colBut mr-3 w-7 h-7 bg-blue-700 rounded-full`}
          id="default"
          onClick={currentSwitch}
        ></button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  ringCol: "black",
};

export default Navbar;
