"use client";
import { FormEvent, useState } from "react";
//import * as apiTodos from "../helpers/todos";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { addTodo } from "../actions/actions";

export const NewTodo = () => {
  const [description, setDescription] = useState("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    const complete = false
    await addTodo(description, complete);
    setDescription("");

  };

  const deleteTodos = async () => {
    //await apiTodos.deleteCompletedTodos();
    router.refresh();
  };

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        type="text"
        value={description}
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        onChange={({ target }) => setDescription(target.value)}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteTodos()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  );
};
