"use client"

import TaskList from "./TaskList";

type Props = {
  todos: { id: number; description: string; completed: boolean }[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  clearCompleted: () => void;
};

export default function Personal({ todos, toggleComplete, deleteTask,clearCompleted }: Props) {
  return <TaskList 
    todos={todos} 
    toggleComplete={toggleComplete} 
    deleteTask={deleteTask} 
    clearCompleted={clearCompleted} 
    />;
}
