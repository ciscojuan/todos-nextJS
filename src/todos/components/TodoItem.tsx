import { Todo } from "@prisma/client";
import styles from "./Todo.module.css";
import {
  IoCheckbox,
  IoCheckboxOutline,
  IoDesktopOutline,
  IoSquareOutline,
} from "react-icons/io5";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => void;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const { id, description, complete, createdAt } = todo;
  return (
    <div className={todo.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
        <div
          className={`relativeflex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            complete ? "bg-blue-100" : "bg-red-100 "
          }`}
          onClick={() => toggleTodo(id, !complete)}
        >
          {complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">{description}</div>
        {complete && (
          <div className="absolute top-0 right-0 p-2">
            <IoDesktopOutline className="text-red-600" />
          </div>
        )}
      </div>
    </div>
  );
};
