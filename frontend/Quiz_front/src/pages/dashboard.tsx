import { lazy, Suspense } from "react";
import { Header } from "../components/header";
import { QuizForm } from "../components/QuizForm";
import { FormQuestions } from "../components/QuestionForm ";
import { Loading } from "../components/loading";

const Quiz = lazy(() => import("../components/myQuiz"))

const Dashboard = () => {


  return (
    <>
      <Header />
      <main className="p-3r relative  container mx-auto mt-20">
        <div className="w-full flex">
          <Suspense fallback={<Loading />}>
            <section  className="w-80 m-3 me-10 h-screen">
              <Quiz />
            </section>
          </Suspense>
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
