import useFetchQuiz from "../hooks/useFetchQuiz";
import { useAppSelector } from "../app/hooks";

const MyQuiz = () => {
    const userID = useAppSelector((state) => state.auth.myUser);
    const { quiz } = useFetchQuiz();

    const userHasQuiz = quiz.some((quizItem) => quizItem.userId === userID.id);

    return (
        <div className="container mx-auto">
            {userHasQuiz ? (
                quiz
                    .filter((quizItem) => quizItem.userId === userID)
                    .map((filteredQuizItem) => (
                        <div key={filteredQuizItem.id} className="container mx-auto p-3 shadow-lg rounded-lg m-3">
                            <p>{filteredQuizItem.title}</p>
                        </div>
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
