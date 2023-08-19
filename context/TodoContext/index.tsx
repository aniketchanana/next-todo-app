import {
  ITodoContextProvider,
  ITodoDispatchContext,
  ITodoStateContext,
  TodoActions,
} from "@/types/todo.types";
import { createContext, FC, useEffect, useReducer } from "react";
import { todoContextReducer } from "./reducer";
import { get } from "lodash";
import { fetchTodoList } from "@/api/todo.apisCalls";
import { setTodoLists, setTodoListsLoading } from "./actions";
import { Box, Spinner } from "@chakra-ui/react";

export const initialState: ITodoStateContext = {
  allTodoLists: [],
  isAllTodoListLoading: false,
  selectedTodoListItems: [],
};

export const TodoStateContext = createContext<ITodoStateContext>(initialState);
export const TodoDispatchContext = createContext<ITodoDispatchContext>(
  () => {}
);

export const TodoProvider: FC<ITodoContextProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(todoContextReducer, initialState);
  useEffect(() => {
    (async () => {
      dispatch(setTodoListsLoading(true));
      try {
        const allTodoListResponse = await fetchTodoList();
        const allTodoList = get(allTodoListResponse, "data.allList", []);
        dispatch(setTodoLists(allTodoList));
      } catch {
        dispatch(setTodoLists([]));
      }
      dispatch(setTodoListsLoading(false));
    })();
  }, []);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {state.isAllTodoListLoading ? (
          <Box className="flex w-full h-full items-center justify-center">
            <Spinner />
          </Box>
        ) : (
          children
        )}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
