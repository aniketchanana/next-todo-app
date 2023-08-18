export enum TodoActions {
  SET_TODO_LIST = "SET_TODO_LIST",
}

export interface TodoActionType {
  payload?: any;
  type: TodoActions;
}

export interface ITodoItem {
  uuid: string;
  isDeleted: boolean;
  name: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ITodoStateContext {
  todoItems: Array<ITodoItem>;
  selectedTodoList: string;
}

export type ITodoDispatchContext = (action: TodoActionType) => void;

export interface ITodoContextProvider {
  children: React.ReactNode;
}

export interface ICreateListResponse {
  data: { listDetails: ITodoItem };
}

export interface IFetchTodoListResponse {
  data: { allList: ITodoItem[] };
}

export interface IFetchTodoListItems {
  data: { allTodo: Array<ITodoItem> };
}
