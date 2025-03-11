"use client";

import { useState, useEffect } from "react";
import useTodoActions from "./_hooks/action";
import Personal from "./_components/Personal";
import Professional from "./_components/Professional";
import AddForm from "./_components/AddForm";


type Todo = {
  id: number;
  description: string;
  type:string;
  completed: boolean;
};

export default function TodoPage() {
  const { loading, error, getTodos, addTodo,updateTodo, deleteTodo, clearCompletedTodos: apiClearCompleted  } = useTodoActions();
  const [activeTab, setActiveTab] = useState<"personal" | "professional">("personal");
  const [personalTodos, setPersonalTodos] = useState<Todo[]>([]);
  const [professionalTodos, setProfessionalTodos] = useState<Todo[]>([]);
  const [errorMsg, setError ] = useState<string>('')
// ✅ Load todos from localStorage on mount, then fetch from API
  useEffect(() => {
    const storedPersonal = localStorage.getItem("personalTodos");
    const storedProfessional = localStorage.getItem("professionalTodos");

    if (storedPersonal) setPersonalTodos(JSON.parse(storedPersonal));
    if (storedProfessional) setProfessionalTodos(JSON.parse(storedProfessional));

    const fetchTodos = async () => {
      const data = await getTodos();
      console.log(data);
      if (data) {
        setPersonalTodos(data.filter((todo) => todo.type === "personal"));
        setProfessionalTodos(data.filter((todo) => todo.type === "professional"));
      }
    };
    fetchTodos();
  }, []);

  // ✅ Save todos to localStorage when updated
  useEffect(() => {
    localStorage.setItem("personalTodos", JSON.stringify(personalTodos));
  }, [personalTodos]);

  useEffect(() => {
    localStorage.setItem("professionalTodos", JSON.stringify(professionalTodos));
  }, [professionalTodos]);

  // ✅ Add Task
  const addTask = async (description: string) => {
    try {
      const newTask: Todo | null = await addTodo({
        description,
        completed: 0,
        type: activeTab,
      });

      if (newTask) {
        if (activeTab === "personal") {
          setPersonalTodos((prev) => [...prev, newTask]);
        } else {
          setProfessionalTodos((prev) => [...prev, newTask]);
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ Toggle Task Completion via API and update localStorage
  const toggleComplete = async (id: number) => {
    try {
      const todoToUpdate = (activeTab === "personal" ? personalTodos : professionalTodos).find(
        (todo) => todo.id === id
      );

      if (!todoToUpdate) return;

      const updatedCompleted = todoToUpdate.completed === 0 ? 1 : 0;
      console.log('updatedCompleted',updatedCompleted)
      const updatedTodo: Todo | null = await updateTodo(id, {
        completed: updatedCompleted,
      });

      if (updatedTodo) {
        if (activeTab === "personal") {
          setPersonalTodos((prev) =>
            prev.map((task) =>
              task.id === id ? { ...task, completed: updatedCompleted } : task
            )
          );
        } else {
          setProfessionalTodos((prev) =>
            prev.map((task) =>
              task.id === id ? { ...task, completed: updatedCompleted } : task
            )
          );
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const deleted: boolean = await deleteTodo(id);

      if (deleted) {
        if (activeTab === "personal") {
          setPersonalTodos((prev) => prev.filter((task) => task.id !== id));
        } else {
          setProfessionalTodos((prev) => prev.filter((task) => task.id !== id));
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTaskIds = (activeTab === "personal" ? personalTodos : professionalTodos)
        .filter((todo) => todo.completed === 1)
        .map((todo) => todo.id);

      if (completedTaskIds.length > 0) {
        await apiClearCompleted(activeTab, completedTaskIds);

        if (activeTab === "personal") {
          setPersonalTodos((prev) => prev.filter((todo) => todo.completed === 0));
        } else {
          setProfessionalTodos((prev) => prev.filter((todo) => todo.completed === 0));
        }
      }

    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full mx-auto ">
      {/* Tabs Navigation */}
      <div className=" bg-white shadow-lg rounded-lg">
      {/* ✅ Centered & Balanced Tabs */}
      <div className="flex border-b-2 border-gray-300 bg-gray-100">
        <button
          className={`relative flex-1 text-center px-6 py-3 text-lg font-semibold transition-all ${
            activeTab === "personal" ? "text-black" : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal
          {activeTab === "personal" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500" />
          )}
        </button>
        <button
          className={`relative flex-1 text-center px-6 py-3 text-lg font-semibold transition-all ${
            activeTab === "professional" ? "text-black" : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTab("professional")}
        >
          Professional
          {activeTab === "professional" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500" />
          )}
        </button>
      </div>
    </div>
        <div className="max-w-2xl  w-full mx-auto p-6">
            {/* Add Task Form */}
            <AddForm addTask={addTask} />

            {/* Render Personal or Professional List */}
            <div className="mt-4 bg-white rounded-lg ">
                {activeTab === "personal" ? (
                <Personal 
                    todos={personalTodos} 
                    toggleComplete={toggleComplete} 
                    deleteTask={deleteTask}  
                    clearCompleted={clearCompleted}
                />
                
                ) : (
                <Professional 
                    todos={professionalTodos} 
                    toggleComplete={toggleComplete} 
                    deleteTask={deleteTask} 
                    clearCompleted={clearCompleted}
                />
                )}
            </div>
      </div>
    </div>
  );
}
