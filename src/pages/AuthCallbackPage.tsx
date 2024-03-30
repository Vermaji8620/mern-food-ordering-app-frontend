// is page pe redirect hoga auth0 se authenticate hone k bad me , aur fir yaha se useCetareMyuser() wala component call hoga, jaha pe, usi user crdentails ko leke , database me jake store krnege


import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
    console.log("USER", user);
  }, [navigate, user, createUser]);

  return <>Loading...</>;
};

export default AuthCallBackPage;
