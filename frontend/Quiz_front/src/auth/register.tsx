import useFetchRegister from "../hooks/useFetchRegister";
import { useState } from "react";
import { User } from "../interface/interfaces";

const Register = () => {
  const { fetchData } = useFetchRegister();
  const [userData, setUserData] = useState<User>({} as User);
  const [message, setMessage] = useState<string>("");
  const handleSubmit = async () => {
    if (
      !userData.name ||
      !userData.lastname ||
      !userData.email ||
      !userData.username ||
      !userData.password
    ) {
      setMessage("All fields are required");
      return;
    }

    // Email validation check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.email)) {
      setMessage("Please enter a valid email address");
      return;
    }
    // Password validation check
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(userData.password)) {
      setMessage(
        "Password must be at least 6 characters and include both letters and numbers"
      );
      return;
    }
    try {
      setMessage("");
      await fetchData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  return (
    <>
      <header>
        <nav className="p-3 absolute h-full ">
          <div className="text-center">
            <a
              title="Home"
              href="/"
              className=" block shadow-lg p-3 rounded-lg lg:hover:bg-purple-800 lg:hover:text-white transition duration-300"
            >
              <i className="fa-solid fa-house text-3xl"></i>
            </a>

            <a
              href="/login"
              className=" mt-5 block shadow-lg p-3 rounded-lg lg:hover:bg-purple-800 lg:hover:text-white transition duration-300"
              title="login"
            >
              <i className="fa-regular fa-circle-user text-3xl"></i>
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-3 flex items-center justify-center h-screen text-xl">
        <div>
          <form
            className="register_form lg:shadow-lg p-5 m-3 flex-col lg:rounded-lg relative "
            style={{ width: " 25rem", height: "45rem" }}
          >
            <div className="container mx-auto">
              <div className="flex justify-center m-3 p-2">
                <img src="" alt="logo" />
              </div>
              <h1 className="text-center m-5 text-3xl">Register</h1>
              <hr className="mb-6" />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="block p-2 w-full"
              />
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                placeholder="last name"
                value={userData.lastname}
                onChange={handleChange}
                className="block p-2 w-full"
                name="lastname"
              />
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="email"
                value={userData.email}
                onChange={handleChange}
                className="block p-2 w-full"
                name="email"
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="username"
                value={userData.username}
                onChange={handleChange}
                className="block p-2 w-full"
                name="username"
              />
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="password"
                className="block p-2 w-full"
              />
            </div>
            {message && (
              <p className="text-red-600 mt-10 text-center">{message}</p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-5  m-3 p-2 bg-purple-800 text-white rounded-lg w-80 absolute bottom-5 right-7 lg:hover:bg-purple-900 duration-300 transition-all"
            >
              Registrase
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
export default Register;
