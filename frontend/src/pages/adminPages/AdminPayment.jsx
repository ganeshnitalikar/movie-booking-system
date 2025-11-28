
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const AdminPayments = () => {
 const payments = [
  { id: 1, user: "Vighnesh", amount: "$45", status: "Completed", date: "2025-11-28" },
  { id: 2, user: "Krushna", amount: "$30", status: "Refunded", date: "2025-11-28" },
  { id: 3, user: "Ganesh", amount: "$50", status: "Completed", date: "2025-11-27" },
  { id: 4, user: "Keatan", amount: "$25", status: "Pending", date: "2025-11-26" },
  { id: 5, user: "Charlie", amount: "$60", status: "Completed", date: "2025-11-25" },
  { id: 6, user: "Dave", amount: "$40", status: "Refunded", date: "2025-11-24" },
  { id: 7, user: "Fiona", amount: "$35", status: "Completed", date: "2025-11-23" },
  { id: 8, user: "Grace", amount: "$55", status: "Pending", date: "2025-11-22" },
  { id: 9, user: "Henry", amount: "$20", status: "Completed", date: "2025-11-21" },
  { id: 10, user: "Ivy", amount: "$75", status: "Completed", date: "2025-11-20" },
];


  return (
    <div className="p-6">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Payments & Transactions
      </Typography>

      <Card>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">ID</th>
                <th className="text-left">User</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-blue-100 dark:hover:bg-blue-800">
                  <td className="py-3">{p.id}</td>
                  <td>{p.user}</td>
                  <td>{p.amount}</td>
                  <td>{p.status}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
