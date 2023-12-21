import { useEffect, useState, createContext } from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [boardView, setBoardView] = useState("cards");
  const [taskView, setTaskView] = useState("default");

  const toggleBoard = (value) => {
    setBoardView(value);
    window.localStorage.setItem('board-view', value)

  };

  const toggleTask = (value) => {
    setTaskView(value);
    window.localStorage.setItem('task-view', value)
  };

  useEffect(() => {
    window.localStorage.getItem('task-view') ? 
    setTaskView(window.localStorage.getItem('task-view')) :
    setTaskView("default")

    window.localStorage.getItem('board-view') ? 
    setBoardView(window.localStorage.getItem('board-view')) :
    setBoardView("cards")
  }, [])

  return (
    <BoardContext.Provider
      value={{
        boardView,
        taskView,
        toggleBoard,
        toggleTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export {BoardContext, BoardProvider};