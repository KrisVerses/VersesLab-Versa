import { Task } from "../types/types";

export const isEqual = (obj1: Task, obj2: Task) => {
  return (
    obj1.id === obj2.id &&
    obj1.description === obj2.description &&
    obj1.dueDate === obj2.dueDate
  );
};
