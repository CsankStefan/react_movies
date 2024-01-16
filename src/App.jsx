import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard"
import SearchIcon from "./assets/search.png";
import "./App.css";
import imageUrl from "./assets/movies.png";
import { motion } from 'framer-motion';


const swimUpVariants = {
  initial: {
    y: '-100%', 
  },
  animate: {
    y: 0, 
    transition: {
      duration: 2, 
      ease: 'easeInOut', 
    },
  },
};


const API_URL = "";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <motion.div className="slidingTextContainer" 
    
      variants={swimUpVariants}
      initial="initial"
      animate="animate"
    >
      <img src={imageUrl} alt="" />

      </motion.div>
    
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
