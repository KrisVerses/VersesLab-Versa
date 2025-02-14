export type Task = {
  type: "task";
  id: number;
  description: string;
  dueDate: string;
  completed: boolean;
};
export type Note = {
  type: "note";
  id: number;
  title: string;
  description: string;
};
export type Appointment = {
  type: "appointment";
  id: number;
  description: string;
  dueDate: string;
  time: string;
  completed: boolean;
};
export type QuickActionsProps = {
  changeModalType: React.Dispatch<
    React.SetStateAction<"task" | "appointment" | "note" | null>
  >;
};

export type FormInput = Task | Note | Appointment;
