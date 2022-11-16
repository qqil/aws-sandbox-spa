import { useContext, useEffect } from "react";

import jwtDecode from "jwt-decode";
import { authContext, User } from "../context/auth";
import { useNavigate } from "react-router-dom";

export interface LoginParams {
  idToken: string;
  accessToken: string;
  refreshToken: string;

  updateState?: boolean;
  redirectTo?: string;
}
export interface LogoutParams {
  redirectTo?: string;
}

export const useAuth = () => {
  return useContext(authContext);
};

// TODO: Validate JWT token with jwks
export const useProvideAuth = (options?: {
  setUserOnMount?: boolean;
  setUser: (user: User | undefined) => void;
}) => {
  const navigate = useNavigate();

  const logout = (opts: LogoutParams) => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    options?.setUser(undefined);
    if (opts?.redirectTo) navigate(opts.redirectTo);
  };

  const login = (opts: LoginParams) => {
    localStorage.setItem("id_token", opts.idToken);
    localStorage.setItem("access_token", opts.accessToken);
    localStorage.setItem("refresh_token", opts.refreshToken);

    const idTokenPayload: any = jwtDecode(opts.idToken);

    if (opts?.updateState !== false) {
      options?.setUser({ email: idTokenPayload.email });
    }
    if (opts?.redirectTo) navigate(opts.redirectTo);
  };

  if (options?.setUserOnMount === true)
    useEffect(() => {
      const idToken = localStorage.getItem("id_token");

      if (!idToken) return;

      const idTokenPayload: any = jwtDecode(idToken);

      options.setUser({ email: idTokenPayload.email });
    }, []);

  return { logout, login };
};
