import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Tasks } from '../pages/Tasks';
import { Appointments } from '../pages/Appointments';
import { Notes } from '../pages/Notes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
}; 