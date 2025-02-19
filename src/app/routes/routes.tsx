import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "../../pages/Home";
import { Tasks } from "../../pages/Tasks";
import { Appointments } from "../../pages/Appointments";
import { Notes } from "../../pages/Notes";
import { Layout } from "../../components/Layout";
import { NoteEditor } from "../../components/NoteEditor";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="notes" element={<Notes />} />
      <Route path="note-editor/:noteId" element={<NoteEditor />} />
    </Route>
  )
);
