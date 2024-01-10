import { Header } from "./components/header";
import Quiz from "./components/quiz";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto mt-20 p-3">
        <div className="flex flex-wrap">
          <Quiz />
        </div>
      </main>
    </>
  );
}

export default App;
