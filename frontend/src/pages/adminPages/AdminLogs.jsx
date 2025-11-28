
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const AdminLogs = () => {
 
  const logs = [
  { id: 1, action: "User Login", user: "John", time: "10:30 AM" },
  { id: 2, action: "Added Movie", user: "Admin", time: "11:00 AM" },
  { id: 3, action: "Refund Issued", user: "Alice", time: "11:15 AM" },
  { id: 4, action: "Deleted Movie", user: "Admin", time: "11:45 AM" },
  { id: 5, action: "Updated Theater Details", user: "Owner Mike", time: "12:10 PM" },
  { id: 6, action: "New Show Added", user: "Admin", time: "12:30 PM" },
  { id: 7, action: "User Registered", user: "Sarah", time: "12:50 PM" },
  { id: 8, action: "Payment Processed", user: "David", time: "1:10 PM" },
  { id: 9, action: "Booking Cancelled", user: "Emma", time: "1:35 PM" },
  { id: 10, action: "Seat Layout Updated", user: "Admin", time: "1:55 PM" },
];

  

  return (
    <div className="p-6">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        System Logs
      </Typography>

      <Card>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">ID</th>
                <th className="text-left">Action</th>
                <th className="text-left">User</th>
                <th className="text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-b hover:bg-blue-100 dark:hover:bg-blue-800">
                  <td className="py-3">{l.id}</td>
                  <td>{l.action}</td>
                  <td>{l.user}</td>
                  <td>{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogs;
