import useFetchMyUser from "../hooks/useFetchMyUser";
import { useAppSelector } from "../app/hooks";
import Cookies from "js-cookie";
export const Header = () => {
  const myUser = useAppSelector((state) => state.auth.myUser);
  useFetchMyUser();

  return (
    <header className="w-full bg-purple-700">
      <nav className="p-3">
        <div className="w-full flex  justify-between text-white">
          <div>
            <a href="/">
              <img src="" alt="logo" />
            </a>
          </div>

          <div className="nv_options mt-3">
            <ul className="flex">
              <li className="me-10 text-xl">Home</li>
              <li className="me-10 text-xl">Question</li>
              {myUser && (
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
              )}
            </ul>
          </div>

          <div className="flex">
            <div className="search me-20">
              <form
                method="get"
                className="flex bg-white rounded-xl"
                aria-label="Search"
              >
                <div className="me-2 mt-1 text-black">
                  <input
                    type="search"
                    placeholder="search"
                    className="p-2 rounded-xl outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="text-black p-3 hover:bg-gray-900 rounded-r-xl transition duration-300 hover:text-white"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="user">
              {myUser ? (
                <div className="flex">
                  <a
                    href="#"
                    className="flex hover:text-black duration-300 transition-all"
                  >
                    <i className="fa-regular fa-circle-user m-2 text-4xl"></i>
                    <p className="relative top-3 text-xl">{myUser?.username}</p>
                  </a>
                  <a
                    className="mt-3"
                    href="/"
                    title="logaud"
                    type="button"
                    onClick={() => {
                      Cookies.remove("JWTtoken");
                      Cookies.remove("isLogin");
                    }}
                  >
                    <i className="fa-solid fa-right-to-bracket text-2xl ms-5 hover:text-black duration-300 transition-all"></i>
                  </a>
                </div>
              ) : (
                <div>
                  <ul className="flex">
                    <li className="m-2 text-xl hover:text-black duration-300 transition-all">
                      <a href="/login">Login</a>
                    </li>
                    <li className="m-2 text-xl   hover:text-black duration-300 transition-all">
                      <a href="/register">Register</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
