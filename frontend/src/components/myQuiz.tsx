import useFetchQuiz from "../hooks/useFetchQuiz";
import { useAppSelector } from "../app/hooks";
import { motion } from 'framer-motion'
const MyQuiz = () => {
    const user = useAppSelector((state) => state.auth.myUser);
    const { quiz, isloading } = useFetchQuiz();
    const userHasQuiz = quiz.some((quizItem) => quizItem.userId === user?.id);

    if (isloading) {
        return
    }


    return (
        <div

            className="container mx-auto  border lg:h-full p-5 rounded-lg">
            {userHasQuiz ? (
                quiz
                    .filter((quizItem) => quizItem.userId === user?.id)
                    .map((filteredQuizItem) => (
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            key={filteredQuizItem.id} 
                            className="cursor-pointer container mx-auto p-3 shadow-lg rounded-lg m-3">
                            <p>{filteredQuizItem.title}</p>
                        </motion.div>
                    ))
            ) : (
                <div className="h-screen flex items-center justify-center p-3 m-3">
                    <p className="text-2xl">No has creado ninguna prueba.</p>
                </div>
            )}
        </div>
    );
};

export default MyQuiz;
