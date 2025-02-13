import React, { createContext, useState } from "react";
import { Task, Appointment, Note } from "../types/types";
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
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>(initialTasks);
  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
  const [nextAppointment, setNextAppointment] =
    useState<Appointment>(initialAppointment);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([
    initialAppointment,
  ]);
  const [recentNotes, setRecentNotes] = useState<Note[]>(initialRecentNotes);
  const [allNotes, setAllNotes] = useState<Note[]>(initialRecentNotes);

  // state handlers
  const addTask = (newTask: Task) => {
    setAllTasks((prev) => [...prev, newTask]);
    // TODO: Write logic to get 2-3 tasks with closest upcoming due date
  };

  const updateAppointment = (newAppointment: Appointment) => {
    setAllAppointments((prev) => [...prev, newAppointment]);
    //TODO: Write logic to get next appointment
  };

  const addNote = (newNote: Note) => {
    setAllNotes((prev) => [...prev, newNote]);
    //TODO: Write logic to display 2-3 most recent notes
    setRecentNotes((prev) => [newNote, ...prev].slice(0, 3));
  };

  const state = {
    upcomingTasks,
    setUpcomingTasks,
    allTasks,
    setAllTasks,
    nextAppointment,
    setNextAppointment,
    allAppointments,
    setAllAppointments,
    recentNotes,
    setRecentNotes,
    allNotes,
    setAllNotes,
    addTask,
    updateAppointment,
    addNote,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};
