import useFetchLogin from "../hooks/useFetchlogin";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { message, fetchData } = useFetchLogin();

  const handleSubmit = async () => {
    try {
      await fetchData(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <nav className="p-3">
          <a
            href="/"
            className="text-center shadow-lg p-3 rounded-lg lg:hover:bg-purple-800 lg:hover:text-white transition duration-300"
          >
            <i className="fa-solid fa-house text-3xl"></i>
          </a>
        </nav>
      </header>
      <main className="container mx-auto p-3 flex items-center justify-center h-screen text-xl">
        <div>
          <form
            className="form_login mb-4 lg:shadow-lg p-5 lg:rounded-lg relative "
            style={{ height: 650, width: 400 }}
          >
            <div className="flex flex-col h-screen">
              <div className="flex max-w-screen justify-center mb-10">
                <img src="" alt="logo" />
              </div>
              <h1 className="text-center m-5 text-3xl">Login</h1>
              <hr  className="mb-5"/>
              <div className="container mx-auto">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 block mb-4 mt-3 w-full rounded"
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="passowrd"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 block mt-3 w-full rounded"
                />
              </div>
              {message && (
                <p className="text-red-600 mt-10 text-center">{message}</p>
              )}

              <a
                href="/register"
                className=" text-white text-center mt-5 left-10 bg-blue-600 absolute w-80 p-2 rounded-lg lg:hover:bg-blue-700 duration-300 transition-all"
                style={{ bottom: "7rem" }}
              >
                Register
              </a>
              <button
                type="button"
                onClick={handleSubmit}
                className="absolute bottom-10 w-80 left-10 bg-purple-800 lg:hover:bg-purple-900 transition duration-300 p-2 rounded-lg text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
