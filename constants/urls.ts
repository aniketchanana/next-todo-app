export enum authEndPoints {
  root = "/auth",
  signIn = "/signin",
  signUp = "/signup",
  logout = "/logout",
  isValidSession = "/isValidSession",
}

export enum todoEndpoints {
  root = "/todo",

  createNewList = "/createNewList",
  getUserTodoList = "/getUserTodoList",
  updateTodoList = "/updateTodoList",
  deleteTodoList = "/deleteTodoList",

  createTodoItem = "/createTodoItem",
  getUserTodoItem = "/getUserTodoItem",
  updateTodoItem = "/updateTodoItem",
  deleteTodoItem = "/deleteTodoItem",
}

const getFullEndPoints = <T>(endPoints): T => {
  const root = endPoints?.root || "";
  const values = {};
  Object.entries(endPoints).forEach(([key, value]) => {
    if (key !== "root") values[key] = `${root}${value}`;
  });
  return values as T;
};

export const authApi =
  getFullEndPoints<Omit<typeof authEndPoints, "root">>(authEndPoints);
export const todoApi =
  getFullEndPoints<Omit<typeof todoEndpoints, "root">>(todoEndpoints);
