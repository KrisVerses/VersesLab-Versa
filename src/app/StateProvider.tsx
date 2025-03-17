import React, { createContext, useEffect, useState } from "react";
import { Task, Appointment, Note } from "../types/types";
import { isEqual } from "../utils/helpers";
import { Tasks } from "../pages/Tasks";

interface StateContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number) => void;
  filteredTasks: () => Task[];
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (appointmentId: number) => void;
  notes: Note[];
  addNote: (note: Note) => void;
  editNote: (note: Note) => void;
  deleteNote: (noteId: number) => void;
}

export const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const addTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = () => {
    // Sort tasks by due date, with incomplete tasks first
    return [...tasks].sort((a, b) => {
      // First sort by completion status
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      
      // Then sort by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };

  const addAppointment = (newAppointment: Appointment) => {
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    ));
  };

  const deleteAppointment = (appointmentId: number) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
  };

  const addNote = (newNote: Note) => {
    setNotes(prev => [...prev, newNote]);
  };

  const editNote = (updatedNote: Note) => {
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const deleteNote = (noteId: number) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const value: StateContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    filteredTasks,
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    notes,
    addNote,
    editNote,
    deleteNote,
  };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};
