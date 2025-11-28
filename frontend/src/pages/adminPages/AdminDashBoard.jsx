
import React, { useContext } from "react";
import { ThemeModeContext } from "../../context/ThemeContext";
import { Card, CardContent, Typography } from "@mui/material";

const AdminDashboard = () => {
  const { colors } = useContext(ThemeModeContext);

  const stats = [
  { label: "Total Movies", value: 120, color: "primary" },
  { label: "Users", value: 450, color: "secondary" },
  { label: "Total Revenue", value: "$12,500", color: "accent" },
  { label: "Bookings", value: 300, color: "success" },
  { label: "Active Theaters", value: 42, color: "warning" },
  { label: "Screens Across Theaters", value: 210, color: "error" },
  { label: "Upcoming Shows", value: 85, color: "primary" },
  { label: "Pending Refunds", value: 14, color: "secondary" },
  { label: "Today’s Tickets Sold", value: 980, color: "accent" },
  { label: "System Uptime (hrs)", value: 264, color: "success" },
];


  const activities = [
    "User John booked 3 tickets for Inception",
    "New movie added: Interstellar",
    "Refund processed for User Alice",
    "Backup completed successfully",
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <Card key={i} sx={{ borderLeft: `5px solid ${colors[s.color]}` }}>
            <CardContent>
              <Typography variant="h6">{s.label}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {s.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent Activities
          </Typography>
          <ul className="list-disc ml-6 space-y-2">
            {activities.map((a, i) => (
              <li key={i} className="text-sm">
                {a}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
