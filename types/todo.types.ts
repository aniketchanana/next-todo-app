export enum TodoActions {
  SET_TODO_LISTS = "SET_TODO_LISTS",
  SET_TODO_LISTS_LOADING = "SET_TODO_LISTS_LOADING",
  ADD_NEW_LIST = "ADD_NEW_LIST",
  UPDATE_TODO_DETAILS = "UPDATE_TODO_DETAILS",
}

export interface TodoActionType {
  payload?: any;
  type: TodoActions;
}

export interface ITodoList {
  uuid: string;
  isDeleted: boolean;
  name: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ITodoItem {}
export interface ITodoStateContext {
  allTodoLists: ITodoList[];
  isAllTodoListLoading: boolean;
}

export type ITodoDispatchContext = (action: TodoActionType) => void;

export interface ITodoContextProvider {
  children: React.ReactNode;
}

export interface ICreateListResponse {
  data: { listDetails: ITodoList };
}
export interface IUpdateListResponse {
  success: boolean;
}

export interface IFetchTodoListResponse {
  data: { allList: ITodoList[] };
}

export interface IFetchTodoListItems {
  data: { allTodo: Array<ITodoItem> };
}
