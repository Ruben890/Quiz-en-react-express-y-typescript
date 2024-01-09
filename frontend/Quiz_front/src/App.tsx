import { Header } from "./components/header";
import Quiz from "./components/quiz";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto mt-20">
        <Quiz/>
      </main>
    </>
  );
}

export default App;
