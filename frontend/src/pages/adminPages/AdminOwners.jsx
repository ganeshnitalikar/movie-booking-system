import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const AdminOwners = () => {
  const owners = [
  { id: 1, name: "CineMax Pvt Ltd", city: "Mumbai", screens: 12 },
  { id: 2, name: "PVR Cinemas", city: "Delhi", screens: 18 },
  { id: 3, name: "INOX", city: "Pune", screens: 10 },
  { id: 4, name: "Carnival Cinemas", city: "Baramati", screens: 15 },
  { id: 5, name: "Big Cinemas", city: "Chennai", screens: 8 },
  { id: 6, name: "Wave Cinemas", city: "Hyderabad", screens: 11 },
  { id: 7, name: "Fun Cinemas", city: "Kolkata", screens: 9 },
  { id: 8, name: "Satyam Cinemas", city: "Ahmedabad", screens: 7 },
  { id: 9, name: "Miraj Cinemas", city: "Nagpur", screens: 14 },
  { id: 10, name: "City Pride", city: "Satara", screens: 6 },
];


  return (
    <div className="p-6">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Theater Owners
      </Typography>

      <Card>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">ID</th>
                <th className="text-left">Owner Name</th>
                <th className="text-left">City</th>
                <th className="text-left">Screens</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((o) => (
                <tr key={o.id} className="border-b hover:bg-blue-100 dark:hover:bg-blue-800">
                  <td className="py-3">{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.city}</td>
                  <td>{o.screens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOwners;
