import { FC } from "react";
import { LoginWithCognitoButton } from "./partials/LoginWithCognitoButton";

export const LoginForm: FC = () => (
  <div className="flex flex-col border-solid border-2 rounded-md p-2 justify-center items-center space-y-4">
    <ul className="space-y-2 flex flex-col">
      <li>
        <LoginWithCognitoButton />
      </li>
    </ul>
  </div>
);
