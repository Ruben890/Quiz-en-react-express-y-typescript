import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizForm } from "./QuizForm";
import { FormQuestions } from "./QuestionForm ";
interface PropsModal {
  width: string;
  height: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<PropsModal> = ({
  width,
  height,
  isOpen,
  onClose,
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-50%", opacity: 0, scale: 0 },
    visible: { y: "50%", opacity: 1, scale: 1 },
  };

  useEffect(() => {
    // Al abrir el modal, deshabilita el scroll
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    // Al cerrar el modal, habilita el scroll nuevamente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          {/* Fondo oscuro transparente */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black"
          ></motion.div>

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed -top-20 z-10 shadow-2xl bg-white rounded-xl p-10"
            style={{ width: width, height: height }}
          >
            <motion.button
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
              type="button"
              className="absolute -right-3 -top-4 bg-red-400 text-gray-900 rounded-full p-2 ps-3 pe-3 hover:bg-red-500 duration-300 transition-all"
            >
              <i className="fa-solid fa-x text-3xl"></i>
            </motion.button>
            <div className="w-full h-full">
              <div className="container mx-auto m-3 flex h-full relative w-full justify-center ">
                <div>
                  <QuizForm />
                </div>

                <div>
                  <FormQuestions />
                </div>
              </div>

              <div className=" w-full flex justify-end relative  text-white " style={{ bottom: "3rem" }}>
                <button className=" rounded-lg bg-green-400 p-3 w-80 hover:bg-green-700 duration-300 transition-all">Crear prueba</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
