import React, { createContext, useEffect, useState } from "react";
import { Task, Appointment, Note } from "../types/types";
import { isEqual } from "../utils/helpers";
import { Tasks } from "../pages/Tasks";
export const StateContext = createContext<any>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // initial state
  const initialTasks: Task[] = [
    {
      type: "task",
      id: 1,
      description: "Task 1",
      dueDate: "2025-02-15",
      completed: false,
    },
    {
      type: "task",
      id: 2,
      description: "Task 2",
      dueDate: "2025-02-16",
      completed: false,
    },
  ];
  const initialAppointment: Appointment = {
    type: "appointment",
    id: 1,
    description: "Meeting with John",
    dueDate: "2025-12-14",
    time: "10:00 AM",
    completed: false,
  };

  const initialRecentNotes: Note[] = [
    {
      type: "note",
      id: 1,
      title: "Reflect on Weekly Wins",
      description: "placeholder text",
    },
    {
      type: "note",
      id: 2,
      title: "Sketch wireframes for new project",
      description: "placeholder text",
    },
  ];

  // state
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>(initialTasks);
  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
  const [completed, setCompleted] = useState<boolean>(false);
  const [nextAppointment, setNextAppointment] =
    useState<Appointment>(initialAppointment);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([
    initialAppointment,
  ]);
  const [recentNotes, setRecentNotes] = useState<Note[]>(initialRecentNotes);
  const [allNotes, setAllNotes] = useState<Note[]>(initialRecentNotes);
  const [filter, setFilter] = useState<any>("All");

  // state handlers
  /* Tasks */
  const addTask = (newTask: Task) => {
    setAllTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      syncUpcomingTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const editTask = (updatedTask: Task) => {
    setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updatedTask.id && !isEqual(task, updatedTask)
          ? updatedTask
          : task
      );
      syncUpcomingTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (taskId: number) => {
    setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      syncUpcomingTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const syncUpcomingTasks = (tasks: Task[]) => {
    console.log("updating upcoming tasks...");
    setUpcomingTasks(tasks.slice(0, 3));
  };

  const toggleTaskCompletion = (taskId: number) => {
    console.log("Updating...");
    let updatedTasks = allTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setAllTasks(updatedTasks);
  };

  /* Appointments */

  const updateAppointment = (newAppointment: Appointment) => {
    setAllAppointments((prev) => [...prev, newAppointment]);
    //TODO: Write logic to get next appointment
  };

  const addNote = (newNote: Note) => {
    setAllNotes((prev) => [...prev, newNote]);
    //TODO: Write logic to display 2-3 most recent notes
    setRecentNotes((prev) => [newNote, ...prev].slice(0, 3));
  };

  // Filter Options
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredTasks = allTasks.filter((task) =>
    filter === "Completed" ? task.completed : !task.completed
  );

  const state = {
    upcomingTasks,
    setUpcomingTasks,
    allTasks,
    setAllTasks,
    editTask,
    deleteTask,
    completed,
    setCompleted,
    toggleTaskCompletion,
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
    filter,
    setFilter,
    filteredTasks,
    handleFilterChange,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};
