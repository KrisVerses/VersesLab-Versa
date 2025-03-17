import React, { useContext, useState } from "react";
import { StateContext } from "../app/StateProvider";
import { DynamicFormModal } from "../components/DynamicFormModal";
import { Appointment, FormInput } from "../types/types";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, PlusIcon } from "@heroicons/react/24/outline";

export const Appointments = () => {
  const context = useContext(StateContext);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  if (!context) {
    return null;
  }

  const { appointments, addAppointment, updateAppointment } = context;

  const handleSave = (formData: FormInput) => {
    if (editingAppointment) {
      updateAppointment(formData as Appointment);
    } else {
      addAppointment(formData as Appointment);
    }
    setShowModal(false);
    setEditingAppointment(null);
  };

  const createLocalDate = (dateStr: string, timeStr: string = "00:00") => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter appointments based on selected date
  const filteredAppointments = appointments.filter(appointment => {
    if (!selectedDate) return true;
    return appointment.dueDate === selectedDate;
  });

  // Get upcoming appointments (future dates only)
  const now = new Date();
  const upcomingAppointments = appointments
    .filter(appointment => {
      const appointmentDate = createLocalDate(appointment.dueDate, appointment.time);
      return appointmentDate > now;
    })
    .sort((a, b) => {
      const dateA = createLocalDate(a.dueDate, a.time);
      const dateB = createLocalDate(b.dueDate, b.time);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
            Appointments
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add Appointment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No appointments found for this date</p>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-medium">{appointment.description}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(appointment.dueDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {formatTime(appointment.time)}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {upcomingAppointments.length === 0 ? (
                <p className="text-gray-500 text-center">No upcoming appointments</p>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium">{appointment.description}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {formatDate(appointment.dueDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {formatTime(appointment.time)}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <DynamicFormModal
            formType="appointment"
            onClose={() => {
              setShowModal(false);
              setEditingAppointment(null);
            }}
            onSave={handleSave}
            initialData={editingAppointment as FormInput}
          />
        )}
      </div>
    </div>
  );
};
