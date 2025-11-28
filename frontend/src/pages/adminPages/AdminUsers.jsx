
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const AdminUsers = () => {
 const users = [
  { id: 1, name: "Vighnesh", email: "john@gmail.com", role: "User" },
  { id: 2, name: "Ganesh", email: "alice@gmail.com", role: "User" },
  { id: 3, name: "Krushna", email: "admin@gmail.com", role: "Admin" },
  { id: 4, name: "Ketan", email: "bob@gmail.com", role: "User" },
  { id: 5, name: "Eve Johnson", email: "eve@gmail.com", role: "User" },
  { id: 6, name: "Charlie Brown", email: "charlie@gmail.com", role: "User" },
  { id: 7, name: "Dave Lee", email: "dave@gmail.com", role: "User" },
  { id: 8, name: "Fiona White", email: "fiona@gmail.com", role: "User" },
  { id: 9, name: "Grace Kim", email: "grace@gmail.com", role: "User" },
  { id: 10, name: "Henry Adams", email: "henry@gmail.com", role: "User" },
];


  return (
    <div className="p-6">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Users Management
      </Typography>

      <Card>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">ID</th>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-blue-100 dark:hover:bg-blue-800">

                  <td className="py-3">{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
