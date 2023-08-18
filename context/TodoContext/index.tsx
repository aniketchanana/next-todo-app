import {
  ITodoContextProvider,
  ITodoDispatchContext,
  ITodoStateContext,
} from "@/types/todo.types";
import { createContext, FC, useReducer } from "react";
import { todoContextReducer } from "./reducer";

export const initialState: ITodoStateContext = {
  todoItems: [],
  selectedTodoList: "",
};

export const TodoStateContext = createContext<ITodoStateContext>(initialState);
export const TodoDispatchContext = createContext<ITodoDispatchContext>(
  () => {}
);

export const TodoProvider: FC<ITodoContextProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(todoContextReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
