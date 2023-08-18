import {
  ITodoStateContext,
  TodoActionType,
  TodoActions,
} from "@/types/todo.types";

export const todoContextReducer: React.Reducer<
  ITodoStateContext,
  TodoActionType
> = (state: ITodoStateContext, action: TodoActionType): ITodoStateContext => {
  switch (action.type) {
    case TodoActions.SET_TODO_LISTS: {
      return { ...state, allTodoLists: action.payload };
    }
    case TodoActions.SET_TODO_LISTS_LOADING: {
      return { ...state, isAllTodoListLoading: action.payload };
    }
    case TodoActions.ADD_NEW_LIST: {
      return {
        ...state,
        allTodoLists: [action.payload, ...state.allTodoLists],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
