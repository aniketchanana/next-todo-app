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
    case TodoActions.UPDATE_TODO_DETAILS: {
      const { listId, updatedName } = action.payload;
      return {
        ...state,
        allTodoLists: state.allTodoLists.map((listDetails) => {
          if (listDetails.uuid === listId) {
            listDetails.name = updatedName;
          }
          return listDetails;
        }),
      };
    }
    case TodoActions.DELETE_TODO_LIST: {
      const { todoListId } = action.payload;
      return {
        ...state,
        allTodoLists: state.allTodoLists.filter(
          ({ uuid: listId }) => todoListId !== listId
        ),
      };
    }
    case TodoActions.ADD_NEW_TODO_ITEM: {
      const { todoItem } = action.payload;

      return {
        ...state,
        selectedTodoListItems: [...state.selectedTodoListItems, todoItem],
      };
    }
    case TodoActions.SET_ALL_TODO_ITEMS: {
      const { todoItems } = action.payload;
      return { ...state, selectedTodoListItems: [...todoItems] };
    }
    case TodoActions.DELETE_TODO_ITEM: {
      const { todoItemId } = action.payload;
      return {
        ...state,
        selectedTodoListItems: state.selectedTodoListItems.filter(
          (item) => item.uuid !== todoItemId
        ),
      };
    }
    case TodoActions.UPDATE_TODO_ITEM: {
      const { updates, todoItemId } = action.payload;
      return {
        ...state,
        selectedTodoListItems: state.selectedTodoListItems.map((item) => {
          if (item.uuid === todoItemId) {
            return {
              ...item,
              ...updates,
            };
          }
          return item;
        }),
      };
    }
    case TodoActions.SET_ALL_TODO_ITEMS_LOADING: {
      const { isLoading } = action.payload;
      return { ...state, isAllTodoItemsLoading: isLoading };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
