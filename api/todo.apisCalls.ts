import { todoEndpoints } from "@/constants/endPoints";
import { GenericObject } from "@/types/common.types";
import {
  ICreateListResponse,
  IFetchTodoListItems,
  IFetchTodoListResponse,
} from "@/types/todo.types";
import { getApi, postApi } from "@/utils/api.utils";

export const fetchTodoList = async (
  token,
  pageNumber?: number,
  pageSize?: number
) => {
  const headers = {} as GenericObject;
  if (token) {
    headers.token = token;
  }
  let queryString = "";
  if (pageNumber && pageSize) {
    queryString = `?pageNumber=${pageNumber}&pageSize${pageSize}`;
  }
  try {
    const res = await getApi<IFetchTodoListResponse>(
      `${todoEndpoints.getUserTodoList}${queryString}`,
      headers
    );
    return res.data;
  } catch (e: any) {
    throw e;
  }
};

export const fetchAllTodoItems = async (listId: string, token: string) => {
  try {
    const res = await getApi<IFetchTodoListItems>(
      `${todoEndpoints.getUserTodoItem}?listId=${listId}`,
      { token }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const createTodoList = (listName) => {
  return postApi<ICreateListResponse>(todoEndpoints.createNewList, {
    listName,
  });
};
