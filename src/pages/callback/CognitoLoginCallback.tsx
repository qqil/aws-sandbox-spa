import { Alert, Spinner } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ensureTrailingSlash } from "../../utils/url";

const CognitoLoginCallbackPage: FC = () => {
  const [urlSearchParams] = useSearchParams();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (user) return navigate("/");

      const code = urlSearchParams.get("code");

      if (!code) throw new Error("Callback code is not provided");

      const redirectUri = new URL(
        "auth/callback/cognito",
        window.location.origin
      ).toString();

      const tokenRequestUrl = new URL(
        "./cognito/token",
        ensureTrailingSlash(import.meta.env["PUBLIC_API_AUTHORIZATION_SERVICE"])
      );

      const tokenResponse = await fetch(tokenRequestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirectUri, code }),
      });

      if (!tokenResponse.ok) {
        setError(`${tokenResponse.status}:${tokenResponse.statusText}`);
        return;
      }

      const {
        id_token: idToken,
        refresh_token: refreshToken,
        access_token: accessToken,
      }: any = await tokenResponse.json();

      if (login) login({ idToken, refreshToken, accessToken });
    })();
  }, [user]);

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Spinner size="xl" light={true} />
      <div className="mt-5">
        <span>Autheticating...</span>
      </div>
      {error && (
        <Alert color={"failure"}>
          <span className="font-medium">Error! </span>
          <span>{error}</span>
        </Alert>
      )}
    </div>
  );
};

export default CognitoLoginCallbackPage;
