import { ITodoItem, ITodoList, TodoActions } from "@/types/todo.types";

export const setTodoLists = (list: ITodoList[]) => ({
  type: TodoActions.SET_TODO_LISTS,
  payload: list,
});
export const setTodoListsLoading = (isLoading: boolean) => ({
  type: TodoActions.SET_TODO_LISTS_LOADING,
  payload: isLoading,
});
export const addNewTodoList = (newTodoList: ITodoList) => ({
  type: TodoActions.ADD_NEW_LIST,
  payload: newTodoList,
});
export const updateTodoListAction = (listId: string, updatedName: string) => ({
  type: TodoActions.UPDATE_TODO_DETAILS,
  payload: { listId, updatedName },
});
export const deleteTodoListAction = (todoListId: string) => ({
  type: TodoActions.DELETE_TODO_LIST,
  payload: { todoListId },
});
export const addNewTodoItemAction = (
  todoListId: string,
  todoItem: ITodoItem
) => ({
  type: TodoActions.ADD_NEW_TODO_ITEM,
  payload: { todoItem, todoListId },
});
export const setAllTodoItems = (todoItems: ITodoItem[]) => ({
  type: TodoActions.SET_ALL_TODO_ITEMS,
  payload: { todoItems },
});
