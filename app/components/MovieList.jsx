"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function MovieList() {
  const router = useRouter()
  const [movies, setMovies] = useState();
  const [getMovie, setGetMovie] = useState(true);
  useEffect(() => {
    async function getMovies() {
      const res = await fetch("http://localhost:3000/api/get");

      const data = await res.json();
      console.log(data);
      setMovies(data);
    }
    getMovies();
  }, [getMovie]);

  const [editingMovie, setEditingMovie] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    actors: "",
    year: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleAddMovie = async () => {
    const newMovie = {
      title: formState.title,
      actors: formState.actors.split(","),
      year: parseInt(formState.year, 10),
    };

    try {
      const response = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add movie");
      }
      setGetMovie(!getMovie);
    } catch (error) {
      console.error("Error adding movie:", error.message);
    }
  };

  const handleEditMovie = (id) => {
    const movie = movies.find((m) => m.id === id);
    setEditingMovie(id);
    setFormState({
      title: movie.title,
      actors: movie.actors.join(","),
      year: movie.year,
    });
  };
  
  const handleSaveEdit = () => {
    setMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.id === editingMovie
          ? {
              ...m,
              title: formState.title,
              actors: formState.actors.split(","),
              year: formState.year,
            }
          : m
      )
    );
    setEditingMovie(null);
    setFormState({ title: "", actors: "", year: "" });
  };

  const handleDeleteMovie = async (id) => { 
    try { 
      const response = await axios.delete(`http://localhost:3000/api/delete/${id}`); 
        if (response.status === 200) { 
          setMovies(movies.filter(movie => movie.id !== id)); 
        } else { console.error('Failed to delete movie'); 

        } } catch (error) { 
          console.error('Error deleting movie:', error.message); 
        } finally { router.refresh(); 
      }};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movies List</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingMovie ? "Edit Movie" : "Add a New Movie"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mb-2 bg-transparent"
        />
        <input
          type="text"
          name="actors"
          placeholder="Actors (comma separated)"
          value={formState.actors}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mb-2 bg-transparent"
        />
        <input
          type="number"
          name="year"
          placeholder="Release Year"
          value={formState.year}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mb-2 bg-transparent"
        />
        {editingMovie ? (
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleAddMovie}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Movie
          </button>
        )}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {movies && (
          <>
            {" "}
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
