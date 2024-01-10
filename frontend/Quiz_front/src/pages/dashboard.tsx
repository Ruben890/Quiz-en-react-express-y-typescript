import { Header } from "../components/header";
import { QuizForm } from "../components/QuizForm";
import { FormQuestions } from "../components/QuestionForm ";
import MyQuiz from "../components/myQuiz";



const Dashboard = () => {


  return (
    <>
      <Header />
      <main className="p-3r relative  container mx-auto mt-20">
        <div className="w-full flex">

          <section className="w-80 m-3 me-10 h-screen">
            <MyQuiz />
          </section>

          <section className="w-full h-screen mt-9">
            <div>
              <QuizForm />
            </div>
            <div>
              <FormQuestions />
            </div>
          </section>
        </div>


      </main>
    </>
  );
};

export default Dashboard;
