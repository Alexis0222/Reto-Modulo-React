import './App.css'
import { QuestionForm } from "./Components/QuestionForm";
import { QuestionList } from "./Components/QuestionList";
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Components/GlobalContex";
function App() {
  return (
    <>
      <ContextProvider>
      
        <Routes>
          <Route path="/" Component={QuestionList} exact />
          <Route path="/add" Component={QuestionForm} />
          <Route path="/Edit/:id" Component={QuestionForm} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
