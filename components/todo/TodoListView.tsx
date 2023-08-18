import { ITodoItem } from "@/types/todo.types";
import { FC } from "react";

interface ITodoListView {
  allList: ITodoItem[];
}
export const TodoListView: FC<ITodoListView> = ({ allList }) => {
  return <div></div>;
};
