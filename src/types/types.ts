export type Task = {
  type: "task";
  id: number;
  description: string;
  dueDate: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
};
export type Note = {
  type: "note";
  id: number;
  title: string;
  content: string;
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

export type DynamicFormModalProps = {
  formType: FormType;
  initialData?: FormInput;
  onClose: () => void;
  onSave: (data: FormInput) => void;
};

export type CalendarViewProps = {
  allAppointments: Appointment[];
  setSelectedDate: (date: Date | null) => void;
  selectedDate: Date;
};

export type FormInput = Task | Note | Appointment;
export type FormType = "task" | "appointment" | "note";
