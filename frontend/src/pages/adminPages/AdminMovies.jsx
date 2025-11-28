
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const AdminMovies = () => {
 const movies = [
  { id: 1, name: "Inception", genre: "Sci-Fi", rating: "8.8" },
  { id: 2, name: "Interstellar", genre: "Sci-Fi", rating: "8.6" },
  { id: 3, name: "Tenet", genre: "Action", rating: "7.5" },
  { id: 4, name: "The Dark Knight", genre: "Action", rating: "9.0" },
  { id: 5, name: "Dunkirk", genre: "War", rating: "7.9" },
  { id: 6, name: "Memento", genre: "Thriller", rating: "8.4" },
  { id: 7, name: "The Prestige", genre: "Drama", rating: "8.5" },
  { id: 8, name: "Avatar", genre: "Sci-Fi", rating: "7.8" },
  { id: 9, name: "Gladiator", genre: "Action", rating: "8.5" },
  { id: 10, name: "Titanic", genre: "Romance", rating: "7.8" },
];


  return (
    <div className="p-6">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Movies Management
      </Typography>

      <Card>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">ID</th>
                <th className="text-left">Name</th>
                <th className="text-left">Genre</th>
                <th className="text-left">Rating</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id} className="border-b hover:bg-blue-100 dark:hover:bg-blue-800">
                  <td className="py-3">{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.genre}</td>
                  <td>{m.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMovies;
