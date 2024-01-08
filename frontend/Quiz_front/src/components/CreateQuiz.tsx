import React, { useState } from "react"
import { Quiz } from "../interface/interfaces"
import useFetchCreateQuiz from "../hooks/useFetchcreateQuiz"
export const QuizForm = () => {
  const [quizData, setQuizData] = useState<Quiz>({} as Quiz)
  const [message, setMessage] = useState<string>("")
  const { fetchData } = useFetchCreateQuiz()

  const handleSubmit = async () => {
    try {
      setMessage("")
      await fetchData(quizData)

    } catch (error) {
      console.error(error)
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuizData((prevQuizData) => ({ ...prevQuizData, [name]: value }))
  }
  return (
    <>
      <div className="container mx-auto p-3">
        <form>
          <div>
            <label htmlFor="title">title</label>
            <input type="text" placeholder="title" name="title" value={quizData.title} onChange={handleChange} />
            
          </div>
        </form>

      </div>
    </>
  )
}