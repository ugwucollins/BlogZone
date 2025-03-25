import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar({ search, setsearch }: any) {
  const menus = [
    { path: "/", files: "Home" },
    { path: "/create", files: "Post" },
  ];
  const [selectIndex, setselectIndex] = useState<Number>(0);
  const [menuBar, setmenuBar] = useState(false);

  return (
    <>
      <div
        className="
         grid grid-flow-col bg-slate-600 
       w-full h-14 z-20 sticky top-1 mt-1 p-2 border-none rounded-sm"
      >
        <div className=" bg-transparent ml-2 w-full sm:w-[60%] max-[300px]:ml-0 mt-2 max-[165px]:hidden font-bold">
          <Link
            to="/"
            className="bg-transparent font-bold capitalize text-white hover:text-slate-200  transition-transform hover:text-[17px]"
          >
            My Blog
          </Link>
        </div>

        <div className=" bg-transparent w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className=" w-full bg-slate-50 dark:bg-slate-200 p-2 rounded-lg focus:outline-none max-w-[900px]"
          />
        </div>

        <div className="bg-transparent ml-0 w-[100%] max-[300px]:w-full">
          <nav className="w-full flex justify-end text-right gap-2 list-none bg-transparent">
            {menus.map((menu, index) => (
              <ul key={index} className="bg-transparent">
                <li
                  key={index}
                  className="bg-transparent mt-[6px] text-right hidden sm:block"
                  onClick={() => setselectIndex(index)}
                >
                  <Link
                    to={menu.path}
                    className={
                      selectIndex === index
                        ? "cursor-pointer underline bg-slate-600 font-bold  text-white"
                        : "cursor-pointer font-semibold bg-transparent hover:text-white text-slate-200"
                    }
                  >
                    {menu.files}
                  </Link>
                </li>
              </ul>
            ))}

            <ul className="block sm:hidden -mt-1 relative bg-transparent">
              <button
                onClick={() => setmenuBar(!menuBar)}
                className="bg-slate-600"
              >
                {menuBar ? (
                  <div
                    className="open relative bg-transparent border-0 w-10 h-1 rounded-xl before:absolute before:bg-white before:w-7
                  before:top-2 before:right-0 before:h-1 before:rotate-45 before:rounded-xl after:absolute after:bg-white after:w-7 after:top-2 after:right-0 after:h-1 after:-rotate-45 after:rounded-xl"
                  ></div>
                ) : (
                  <div className="close relative bg-white w-10 h-1 rounded-xl before:absolute before:bg-white before:w-8 before:top-2 before:right-0 before:h-1 before:rounded-xl after:absolute after:bg-white after:w-6 after:top-4 after:right-0 after:h-1 after:rounded-xl"></div>
                )}
              </button>
            </ul>
          </nav>
        </div>
      </div>

      {/* Active Menu */}
      {menuBar && (
        <div className="z-20 menu absolute sm:hidden block justify-center text-center bg-slate-200 w-full h-[90vh]">
          {menus.map((menu, index) => (
            <ul key={menu.path} className="bg-transparent">
              <li
                key={menu.path}
                className="bg-transparent mt-14 w-full list-none"
                onClick={() => {
                  setmenuBar(false);
                  setselectIndex(index);
                }}
              >
                <Link
                  to={menu.path}
                  className={
                    selectIndex === index
                      ? "cursor-pointer underline bg-slate-200 font-extrabold  text-black"
                      : "cursor-pointer font-semibold bg-transparent hover:text-black text-slate-500 hover:font-bold transition-all hover:text-xl "
                  }
                >
                  {menu.files}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
