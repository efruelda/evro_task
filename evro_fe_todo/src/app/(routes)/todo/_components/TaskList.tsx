"use client";

import { useState } from "react";
import { CheckCircle, Circle, Trash2, Pencil, Check, X } from "lucide-react";
import Image from "next/image";

type Props = {
  todos: { id: number; description: string; completed: boolean }[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  clearCompleted: () => void;
  saveEditTask: (id: number,description:string) => void;
};

export default function TaskList({ todos, toggleComplete, saveEditTask, deleteTask, clearCompleted }: Props) {

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const editTask = (id: number, initialText: string) => {
    setEditingTodoId(id);
    setEditText(initialText);
  };

  const cancelEdit = () => {
    setEditingTodoId(null);
    setEditText("");
  };

  const saveEdit = (id:number) => {
    saveEditTask(id,editText)
    setEditingTodoId(null);
    setEditText("");
  }

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
                className="flex-none cursor-pointer"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? (
                  <CheckCircle className="text-orange-500" size={22} />
                ) : (
                  <Circle className="text-gray-500" size={22} />
                )}
              </div>
              <div
                className="text-left w-62 flex-auto ml-5"
              >
                {editingTodoId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => handleEditChange(e)}
                className="border border-gray-300 w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <span
                  className={`text-gray-700 break-words ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.description}
                </span>
              )}
              </div>
              <div className="flex gap-2">
                {editingTodoId === todo.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="text-green-500 hover:text-green-700 transition cursor-pointer"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => editTask(todo.id, todo.description)}
                      className="text-gray-300 hover:text-gray-700 transition cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteTask(todo.id)}
                      className="text-red-300 hover:text-red-700 transition cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
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

