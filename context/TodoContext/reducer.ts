import {
  ITodoStateContext,
  TodoActionType,
  TodoActions,
} from "@/types/todo.types";
import { cloneDeep } from "lodash";

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
    case TodoActions.UPDATE_TODO_DETAILS: {
      const { listId, updatedName } = action.payload;
      const updatedState = cloneDeep(state);
      updatedState.allTodoLists = updatedState.allTodoLists.map(
        (listDetails) => {
          if (listDetails.uuid === listId) {
            listDetails.name = updatedName;
          }
          return listDetails;
        }
      );
      return updatedState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
