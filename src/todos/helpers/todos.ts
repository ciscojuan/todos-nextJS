import axios from "axios";

export const toggleTodo = async (id: string, complete: boolean) => {
  try {
    const todo = await axios.put(`/api/todos/${id}`, { complete: complete });

    return todo.data;
  } catch (error) {
    console.log(error);
  }
};

export const newTodo = async (description: string, complete: boolean) => {
  try {
    const todo = axios.post(`/api/todos`, { description, complete });

    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompletedTodos = async () => {
  try {
    const todos = axios.delete(`/api/todos`);

    return todos;
  } catch (error) {
    console.log(error);
  }
};
