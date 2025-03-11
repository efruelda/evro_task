"use client";

import api from "@/app/config/axiosInterceptor";
import { useState, useCallback } from "react";
import { AxiosError, AxiosResponse } from "axios";

type Todo = {
  id: number;
  description: string;
  completed: number;
  type: "personal" | "professional";
  created_at: string;
};

type ActionHookResult = {
    loading: boolean;
    error: string | null;
    getTodos: (params?: { type?: "personal" | "professional" }) => Promise<Todo[] | null>;
    addTodo: (todo: Omit<Todo, "id" | "created_at">) => Promise<Todo | null>;
    updateTodo: (id: number, todo: Partial<Todo>) => Promise<Todo | null>;
    deleteTodo: (id: number) => Promise<boolean>;
    clearCompletedTodos: (
      type: "personal" | "professional",
      completedTaskIds: number[]
    ) => Promise<void>; // Corrected type definition
};    

const useTodoActions = (): ActionHookResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTodos = useCallback(async (): Promise<Todo[] | null> => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<Todo[]> = await api.get("/api/todos");
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message || "Failed to fetch tasks");
      } else {
        setError("An unexpected error occurred.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(
    async (todo: Omit<Todo, "id" | "created_at">): Promise<Todo | null> => {
      setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<Todo> = await api.post("/api/todos", todo);
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.message || "Failed to add task");
        } else {
          setError("An unexpected error occurred.");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateTodo = useCallback(
    async (id: number, todo: Partial<Todo>): Promise<Todo | null> => {
    //   setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<Todo> = await api.put(`/api/todos/${id}`, todo);
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.message || "Failed to update task.");
        } else {
          setError("An unexpected error occurred.");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteTodo = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/todos/${id}`);
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message || "Failed to delete task.");
      } else {
        setError("An unexpected error occurred.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);


  const clearCompletedTodos = useCallback(
    async (type: "personal" | "professional", completedTaskIds: number[]): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await api.post(`/api/todos/completed/${type}`, { completedTaskIds }); // Send completedTaskIds in the body
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.message || "Failed to clear completed tasks.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompletedTodos
  };
};

export default useTodoActions;