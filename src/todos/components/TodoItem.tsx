import { Todo } from "@prisma/client";
import styles from "./Todo.module.css";
import {
  IoCheckbox,
  IoCheckboxOutline,
  IoSquareOutline,
} from "react-icons/io5";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const { id, description, complete, createdAt } = todo;
  return (
    <div className={todo.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row items-center justify-start  gap-4">
        <div className="flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100">
          {complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">{description}</div>
      </div>
    </div>
  );
};
