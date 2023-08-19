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
  console.log(action);
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
    case TodoActions.DELETE_TODO_LIST: {
      const { todoListId } = action.payload;
      const updatedState = cloneDeep(state);
      updatedState.allTodoLists = updatedState.allTodoLists.filter(
        ({ uuid: listId }) => todoListId !== listId
      );
      return updatedState;
    }
    case TodoActions.ADD_NEW_TODO_ITEM: {
      const { todoItem } = action.payload;
      state.selectedTodoListItems = [...state.selectedTodoListItems, todoItem];
      return state;
    }
    case TodoActions.SET_ALL_TODO_ITEMS: {
      const { todoItems } = action.payload;
      state.selectedTodoListItems = todoItems;
      return state;
    }
    case TodoActions.DELETE_TODO_ITEM: {
      const { todoItemId } = action.payload;
      state.selectedTodoListItems = state.selectedTodoListItems.filter(
        (item) => item.uuid !== todoItemId
      );
      return state;
    }
    case TodoActions.UPDATE_TODO_ITEM: {
      const { updates, todoItemId } = action.payload;
      state.selectedTodoListItems = state.selectedTodoListItems.map((item) => {
        if (item.uuid === todoItemId) {
          return {
            ...item,
            ...updates,
          };
        }
        return item;
      });
      return state;
    }
    case TodoActions.SET_ALL_TODO_ITEMS_LOADING: {
      const { isLoading } = action.payload;
      state.isAllTodoItemsLoading = isLoading;
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
