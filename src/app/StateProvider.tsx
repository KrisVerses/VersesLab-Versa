import React, { createContext, useEffect, useState } from "react";
import { Task, Appointment, Note } from "../types/types";
import { isEqual } from "../utils/helpers";
import { Tasks } from "../pages/Tasks";
export const StateContext = createContext<any>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // state
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [nextAppointment, setNextAppointment] = useState<Appointment>();
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<any>("All");
  const [sortBy, setSortBy] = useState<any>("Due Date");

  // state handlers
  /* Tasks */
  const addTask = (newTask: Task) => {
    setAllTasks((prev) => {
      const updatedTasks = [...prev, newTask];
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
      return updatedTasks;
    });
  };

  const deleteTask = (taskId: number) => {
    setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  const toggleTaskCompletion = (taskId: number) => {
    console.log("Updating...");

    setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
  };

  const sortByTasks = (tasks: Task[]) => {
    const sortedTasks = [...tasks];

    switch (sortBy) {
      case "Due Date":
        return sortedTasks.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
      case "Recently":
        return sortedTasks.sort((a, b) => b.id - a.id);
      case "Priority":
        console.log("Sorting by priority...");
        return sortedTasks.sort(
          (a, b) =>
            (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0)
        );
      default:
        return sortedTasks;
    }
  };

  const filteredTasks = () => {
    let tasks = allTasks;

    // Apply filtering first
    if (filter === "Completed") {
      tasks = tasks.filter((task) => task.completed);
    } else if (filter === "Incompleted") {
      tasks = tasks.filter((task) => !task.completed);
    }

    // Apply sorting
    return sortByTasks(tasks);
  };

  /* Appointments */

  useEffect(() => {
    if (allAppointments.length > 0) {
      const sortedAppointments = [...allAppointments].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
      setNextAppointment(sortedAppointments[0]); // Ensures the closest appointment updates immediately
    } else {
      setNextAppointment(null);
    }
  }, [allAppointments]);

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAllAppointments((prev) => {
      //TODO: Write logic to get next appointment
      return [...prev, updatedAppointment];
    });
  };

  const addAppointment = (newAppointment: Appointment) => {
    setAllAppointments((prev) => {
      const updatedAppointments = [...prev, newAppointment];
      return updatedAppointments;
    });
  };

  const deleteAppointment = (apptId: number) => {
    setAllAppointments((prev) => {
      return prev.filter((appt) => appt.id !== apptId);
    });
  };

  const editAppointment = (updatedAppointment: Appointment) => {
    setAllAppointments((prevAppointments) => {
      const updatedAppts = prevAppointments.map((appt) =>
        appt.id === updatedAppointment.id ? updatedAppointment : appt
      );
      return updatedAppts;
    });
  };

  // Note

  const addNote = (newNote: Note) => {
    setAllNotes((prev) => [...prev, newNote]);
    setRecentNotes((prev) => [newNote, ...prev].slice(0, 3));
  };

  const editNote = (updatedNote: Note) => {
    setAllNotes((prev) => {
      let updatedNotes = prev.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      setRecentNotes(updatedNotes);
      return updatedNotes;
    });
  };

  const deleteNote = (noteId: number) => {
    setAllNotes((prev) => {
      let updatedNotes = prev.filter((note) => note.id !== noteId);
      setRecentNotes(updatedNotes);
      return updatedNotes;
    });
  };

  // Utility
  const priorityOrder: Record<"High" | "Medium" | "Low", number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

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
    addAppointment,
    deleteAppointment,
    recentNotes,
    setRecentNotes,
    allNotes,
    setAllNotes,
    editNote,
    addNote,
    deleteNote,
    addTask,
    updateAppointment,
    editAppointment,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortByTasks,
    filteredTasks,
    priorityOrder,
    handleSortByChange,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};
