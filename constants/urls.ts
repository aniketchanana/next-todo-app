export enum authEndPoints {
  root = "/auth",
  signIn = "/signin",
  signUp = "/signup",
  logout = "/logout",
  isValidSession = "/isValidSession",
}

const getFullEndPoints = <T>(endPoints): T => {
  const root = endPoints?.root || "";
  const values = {};
  Object.entries(authEndPoints).forEach(([key, value]) => {
    if (key !== "root") values[key] = `${root}${value}`;
  });
  return values as T;
};

export const authApi =
  getFullEndPoints<Omit<typeof authEndPoints, "root">>(authEndPoints);
