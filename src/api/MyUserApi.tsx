import { QueryKey } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { User } from "@/Types";

// The difference is the flow of data. useQuery is used to query async data, useMutation is used to mutate it. Or in the traditional CRUD speak:

// Read: useQuery
// Create/Update/Delete: useMutation

const API_USER_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

// for creating a new User
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_USER_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create User");
    }
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: createMyUserRequest });

  console.log(createUser);
  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
};

// for updating the existing user
type updateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: updateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_USER_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update the new User");
    }
    return response.json();
  };

  const mutation = useMutation({ mutationFn: updateMyUserRequest });

  const {
    mutateAsync: updateUser,  // mutateSync ka andar me ek function hai, jise hmne updateUser ke naam se rename kiya hai....aur 
    isPending,
    isSuccess,
    error,
    data,
    reset,
  } = mutation;

  if (isSuccess) {
    toast.success("User Profile updated");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isPending,
    isSuccess,
    error,
    data,
  };
};

// for fetching the user
export const useGetMyUser = () => {
  // get the access token
  const { getAccessTokenSilently } = useAuth0();

  // niche wale Promise<User> ka yeh matlab hai ki yeh function ek user type ka object return karega, aur yeh async function hai, isiliye Promise<User> likha hai., to har ek field ka type define ho gaya hai
  const getMyUserRequest = async (): Promise<User> => {
    const accesstoken = await getAccessTokenSilently();
    const response = await fetch(`${API_USER_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the user");
    }

    return response.json();
  };

  const queryKey: QueryKey = ["my-user"];
  const {
    data: currentUser,
    error,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn: getMyUserRequest,
  });

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};
