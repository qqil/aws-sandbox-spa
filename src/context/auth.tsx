import React, { FC, ReactNode, useState } from "react";
import { useProvideAuth } from "../hooks/useAuth";

export type User = {
  email: string;
};
export type UserContext = {
  user: User | undefined;
  login: CallableFunction;
  logout: CallableFunction;
};

export const authContext = React.createContext<UserContext>({
  user: undefined,
  login: () => console.log("user login"),
  logout: () => console.log("user logout"),
});

export const ProvideAuthContext: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { login, logout } = useProvideAuth({ setUserOnMount: true, setUser });

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};
