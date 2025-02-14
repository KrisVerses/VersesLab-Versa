export type Task = {
  id: number;
  description: string;
  dueDate: string;
  completed: boolean;
};
export type Note = { id: number; title: string };
export type Appointment = {
  id: number;
  description: string;
  dueDate: string;
  time: string;
};
export type QuickActionsProps = {
  changeModalType: React.Dispatch<
    React.SetStateAction<"task" | "appointment" | "note" | null>
  >;
};
