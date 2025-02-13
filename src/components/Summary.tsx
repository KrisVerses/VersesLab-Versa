import React from "react";

export const Summary: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg">
      <div>
        <h3 className="text-lg font-bold">Upcoming Tasks</h3>
        <ul>
          <li>[ ] Task 1 (Due Feb 20)</li>
          <li>[ ] Task 2 (Due Feb 20)</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold">Next Appointment</h3>
        <p>Title: Meeting</p>
        <p>Date: 02/12/25</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Recent Notes</h3>
        <ul>
          <li>- Note 1</li>
          <li>- Note 2</li>
        </ul>
      </div>
    </div>
  );
};
