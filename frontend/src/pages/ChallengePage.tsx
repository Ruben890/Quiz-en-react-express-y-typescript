import useTimeConverter from "../hooks/useTimeConverter";
import useFetchOneQuiz from "../hooks/useFetchOneQuiz";
import { CountdownTimer } from "../components/CountdownTimer";
import { useParams } from "react-router";
import { Questions } from "../components/Questions";
const ChallengePage = () => {
    const params = useParams();
    const { quiz, loading } = useFetchOneQuiz(Number(params.quizId));
    const { convertTime } = useTimeConverter();

    if (loading) {
        return
    }

    return (
        <>
            <header className="w-screen">
                <nav className="shadow-lg p-4 bg-purple-600 text- text-white text-3xl flex w-full justify-between">
                    <h2>{quiz.title}</h2>
                    <div className="flex font-bold">

                        <CountdownTimer
                            initialMinutes={convertTime(quiz.time).minutes}
                            initialHours={convertTime(quiz.time).hours}
                        />
                    </div>
                </nav>
            </header>
            <main className="container mx-auto mt-20">
                <section>
                    <Questions quizId={quiz.id} />
                </section>
            </main>
        </>
    );
};

export default ChallengePage;
