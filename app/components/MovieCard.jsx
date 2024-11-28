import React, { useState } from "react";
import EditForm from "./EditForm";

export default function MovieCard({ movie, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = (updatedMovie) => {
    onUpdate(updatedMovie)
    setIsEditing(false);
  };
  
  return (
    <div className="border p-4 rounded shadow-sm w-80">
      {isEditing ? (
        <EditForm
          data={movie}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      ) : (<>
      
      
      
      <h2 className="text-lg font-semibold text-center">{movie.title}</h2>
      <p>
        <strong>Actors:</strong> {movie.actors.join(", ")}
      </p>
      <p>
        <strong>Release Year:</strong> {movie.year}
      </p>
      <div className="mt-4">
        <button
          onClick={() => onEdit(handleEditClick)}
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
        
      </div>
      </>)}
    </div>
  );
}
