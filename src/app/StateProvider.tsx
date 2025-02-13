import React, { createContext, useState } from "react";
export const StateContext = createContext<any>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // initial state
  const initialTasks = [
    { id: 1, description: "Task 1", dueDate: "02/15/25" },
    { id: 2, description: "Task 2", dueDate: "02/16/25" },
  ];
  const initialAppointment = {
    id: 1,
    description: "Meeting with John",
    dueDate: "02/12/25",
    time: "10:00 AM",
  };

  const initialRecentNotes = [
    { id: 1, title: "Reflect on Weekly Wins" },
    { id: 2, title: "Sketch wireframes for new project" },
  ];

  // state
  const [tasks, setTasks] = useState(initialTasks);
  const [appointment, setAppointment] = useState(initialAppointment);
  const [recentNotes, setRecentNotes] = useState(initialRecentNotes);

  // state handlers
  const addTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const state = {
    tasks,
    setTasks,
    appointment,
    setAppointment,
    recentNotes,
    setRecentNotes,
  };
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};
