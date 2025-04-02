"use client";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { addTodo, deletedTodos } from "../actions/actions";

export const NewTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    const complete = false;
    await addTodo(description, complete);
    setDescription("");
  };

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={description}
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        onChange={({ target }) => {
          const numericValue = target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          setDescription(numericValue);
        }}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deletedTodos()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  );
};
