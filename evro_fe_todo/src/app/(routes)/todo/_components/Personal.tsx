"use client"

import TaskList from "./TaskList";

type Props = {
  todos: { id: number; description: string; completed: boolean }[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  clearCompleted: () => void;
  saveEditTask:(id: number,description:string) => void;
};

export default function Personal({ todos, toggleComplete,saveEditTask, deleteTask,clearCompleted }: Props) {
  return <TaskList 
    todos={todos} 
    toggleComplete={toggleComplete} 
    deleteTask={deleteTask} 
    clearCompleted={clearCompleted} 
    saveEditTask={saveEditTask}
    />;
}
