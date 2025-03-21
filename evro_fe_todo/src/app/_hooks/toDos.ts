"use client"

import api from "@/app/config/axiosInterceptor";
import { useQuery } from '@tanstack/react-query';

export const getTodos = () => {
    let filters = true;
    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['GET_TODOS'],
        queryFn: async (params) => {
            try {
                const response =await api.get("/api/todos", 
                    { params:params }
                );
                return response && response.data.result;
            } catch (error: unknown) {
                return error;
            }
        },
        enabled: filters,
    });
    return [data,isLoading, isFetching, refetch];
}