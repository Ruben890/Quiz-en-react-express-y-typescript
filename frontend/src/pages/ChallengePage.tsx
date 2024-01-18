import useTimeConverter from "../hooks/useTimeConverter"
import useFetchQuiz from "../hooks/useFetchQuiz"



const ChallengePage = () => {
    const { quiz, isloading } = useFetchQuiz()
    const { convertTime } = useTimeConverter()

    return (
        <>
            <header>

            </header>
            <main>

            </main>
        </>
    )
}

export default ChallengePage