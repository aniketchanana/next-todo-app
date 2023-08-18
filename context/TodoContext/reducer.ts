import { ITodoStateContext, TodoActionType } from "@/types/todo.types";

export const todoContextReducer: React.Reducer<
  ITodoStateContext,
  TodoActionType
> = (state: ITodoStateContext, action: TodoActionType): ITodoStateContext => {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
