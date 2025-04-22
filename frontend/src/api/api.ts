const API_URL = "http://localhost:3000/todos";

export interface ITodo {
  id: string;
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

// General Function
const request = async <T>(
  url: string,
  method: string = "GET",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
): Promise<T | null> => {
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`${response.status}`);

    return (await response.json()) as T;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

// READ
export const getTodos = () => request<ITodo[]>(API_URL);
// CREATE
export const addTodo = (title: string, description: string) =>
  request<ITodo[]>(API_URL, "POST", { title, description });
// UPDATE
export const updateTodo = (id: string, updatesField: Partial<ITodo>) =>
  request<{ message: string }>(`${API_URL}/${id}`, "PUT", updatesField);
// DELETE
export const deleteTodo = (id: string) =>
  request<{ message: string }>(`${API_URL}/${id}`, "DELETE");
