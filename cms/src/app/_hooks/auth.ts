import {
    useMutation,
    UseMutateAsyncFunction,
  } from "@tanstack/react-query";
  
import api from "../config/axiosInterceptor";
import useAuthStore from "../_stores/authStore";
  
  export interface LoginResponse {
    token: string; // Or whatever your login response contains
    // Add other properties as needed
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export const useLogin = (): [
    UseMutateAsyncFunction<LoginResponse, unknown, LoginFormData, unknown>,
    boolean,
    boolean,
    unknown
  ] => {

    const authStore = useAuthStore();

    const { mutateAsync, isPending, isError, error } = useMutation({
      mutationFn: async (data: LoginFormData) => {
        try{
            const response = await api.post('/api/login', data);
            console.log('mutation', response);
            authStore.addToken(response.data.token);
            authStore.addUser(response.data.user)
            return response && response.data;
        }catch(error){
            // Correctly throw the axios error
            console.log("mutation error", error);
            throw error;
        }    
      },
      onSuccess: async (data) => {
        console.log('on success', data);
        // auth.addToken(token);
        // auth.setSessionExpired(false);
      },
    });
    return [mutateAsync, isPending, isError, error];
  };