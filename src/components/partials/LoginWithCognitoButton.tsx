import { Button } from "flowbite-react";
import { FC, ReactEventHandler } from "react";

const cognitoRedirectUrl = new URL(
  `https://${import.meta.env["PUBLIC_USER_POOL_DOMAIN"]}.auth.${
    import.meta.env["PUBLIC_USER_POOL_REGION"]
  }.amazoncognito.com/login`
);

cognitoRedirectUrl.searchParams.set(
  "client_id",
  import.meta.env["PUBLIC_USER_POOL_CLIENT_ID"]
);
cognitoRedirectUrl.searchParams.set("response_type", "code");
cognitoRedirectUrl.searchParams.set(
  "redirect_uri",
  new URL("auth/callback/cognito", window.location.origin).toString()
);
cognitoRedirectUrl.searchParams.set("scope", "email openid");

export const LoginWithCognitoButton: FC = () => {
  const handleClick: ReactEventHandler = (event) => {
    event.preventDefault();
    window.location.href = cognitoRedirectUrl.toString();
  };

  return <Button onClick={handleClick}>Cognito</Button>;
};
