import { useContext } from "react";
import { TodoDispatchContext } from ".";

export const useTodoDispatchContext = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Please wrap component with in context provider");
  }
  return context;
};
