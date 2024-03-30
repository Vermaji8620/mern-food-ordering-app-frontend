import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("error");
  }

  const onRedirectCallback = () => {
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // login hone ka baad kaha pe redirect hoga wo niche wala syntaax baatayega
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      // redirect_uri pe jane ka bad , fir kis page pe jana hai, wo onredirectcallback() baataygea
      onRedirectCallback={onRedirectCallback}
      // sidha sidha ye matlab hai ki auth0 se authenticate hone ka baad me, pehle to homepage ("/") (jo ki redirect_uri) hai, and then ("/auth-callback") pe jayega, jo ki onredirectcallback() pe diya hua hai
    >
      {children}
      {/* <Check /> */}
    </Auth0Provider>
  );
};

// const Check = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   if (isLoading) return <div>Loading </div>;
//   if (isAuthenticated) {
//     console.log(user);
//     return;
//   }
//   // return <div>User unauthenticated</div>;
// };

export default Auth0ProviderWithNavigate;
