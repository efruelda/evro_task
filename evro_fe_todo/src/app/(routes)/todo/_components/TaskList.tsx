"use client";

import { CheckCircle, Circle, Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  todos: { id: number; description: string; completed: boolean }[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  clearCompleted: () => void;
};

export default function TaskList({ todos, toggleComplete, deleteTask, clearCompleted }: Props) {
  return (
    <div className="bg-[#F1ECE6] p-6 rounded-2xl">
     <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center py-3 border-b last:border-none border-gray-300"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? (
                  <CheckCircle className="text-orange-500" size={22} />
                ) : (
                  <Circle className="text-gray-500" size={22} />
                )}
                <span
                  className={`text-gray-700 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.description}
                </span>
              </div>

              <button
                onClick={() => deleteTask(todo.id)}
                className="text-red-300 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))
        ) : (
          <li className="py-3 text-gray-500 text-center">No listed tasks</li>
        )}
      </ul>

      {/* Clear Completed Button (only appears when tasks are completed) */}
      {todos.some((todo) => todo.completed) && (

        <div className="relative mt-20 mb-10">     
            <button
              onClick={clearCompleted}
              className="absolute bottom-4 right-4 flex items-center  gap-2 text-orange-500 font-medium text-sm mt-4 hover:underline"
            >
             <Image src="/delete.png" alt="Clear completed" width={20} height={42}/>
              Clear Completed
            </button>        
        </div>
      )}
    </div>
  );
}
