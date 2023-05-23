import { createContext, useReducer } from "react";
import appReducer from "./AppReducer";
import { v4 as uuid4 } from "uuid";
const initialState = {
  videos: [
    {
      id: uuid4(),
      Pregunta: "¿Cual fue tu pelicula favorito de la infancia?",
      videoRespuesta: null,
    },
    {
      id: uuid4(),
      Pregunta: "¿Cual fue tu comida favorito de la infancia?",
      videoRespuesta: null,
    },
    {
      id: uuid4(),
      Pregunta: "¿Cual fue tu videojuego favorito de la infancia?",
      videoRespuesta: null,
    },
    {
      id: uuid4(),
      Pregunta: "¿Cual fue tu animal favorito de la infancia?",
      videoRespuesta: null,
    },
  ],
};
export const GlobalContext = createContext({ initialState });

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const addQuestion = (videos) => {
    videos.id = uuid4();
    dispatch({
      type: "Add_Question",
      payload: { ...videos },
    });
    console.log("añadiendo tarea", videos);
  };
  const deleteQuestion = (question) => {
    dispatch({
      type: "Delete_Question",
    });
    console.log("añadiendo tarea", question);
  };
  const updateQuestion = (question) =>
    dispatch({ type: "Update_Question", payload: question });

  return (
    <GlobalContext.Provider value={{ ...state, addQuestion,updateQuestion }}>
      {children}
    </GlobalContext.Provider>
  );
};
