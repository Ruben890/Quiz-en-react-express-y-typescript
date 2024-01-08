import Quiz from "../components/quiz";
import { Header } from "../components/header";
import { motion } from "framer-motion";
import { Modal } from "../components/modal";
import { useState } from "react";


const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-3r ">
        <div className="h-screen lg:absolute lg:left-2 lg:border-r p-3">
          <div>
            <nav className="flex w-full justify-end">
              <motion.button
                whileTap={{ scale: 1.2 }}
                onClick={openModal}
                title="add quiz"
                type="button"
                className="bg-green-400 p-2 rounded-lg text-white w-10 hover:bg-green-500  hidden sm:hidden md:hidden lg:block"
              >
                <i className="fa-solid fa-plus"></i>
              </motion.button>
            </nav>
          </div>
          <div className="conatiner mx-auto m-3">
            <Quiz />
          </div>
        </div>

        <div className="lg:hidden md:block sm:block">
          
        </div>
        <Modal
          width="80%"
          height="60%"
          isOpen={isModalOpen}
          onClose={closeModal}
        ></Modal>
      </main>
    </>
  );
};

export default Dashboard;