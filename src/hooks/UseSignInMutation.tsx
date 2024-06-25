import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../api/types";
import { client } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export const useSignInMutation = (email: string, password: string) => {
  const navigate = useNavigate();
  const toast = useToast();
  const signIn = useSignIn();

  return useMutation({
    mutationKey: ["Login"],
    mutationFn: () =>
      client.post<AuthResponse>("/users/Login", {
        email,
        password,
      }),
    onSuccess: (res) => {
      signIn({
        auth: {
            token: res.data.authToken.token,
            type: res.data.tokenType
        },
        userState: res.data.authState
      });
      navigate("/");
      toast({
        status: "success",
        title: "Bienvenido",
        isClosable: true
      });
    },
    onError: (err: AxiosError<AuthResponse>) => {
      console.log(err);
      toast({
        status: "error",
        description: "Error de credenciales",
        title: err.response?.data?.error?.description || "Ocurrió un error",
      });
    },
  });
};