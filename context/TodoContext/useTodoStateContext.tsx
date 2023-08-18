import { useContext } from "react";
import { TodoStateContext } from ".";

export const useTodoStateContext = () => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Please wrap component with in context provider");
  }
  return context;
};
