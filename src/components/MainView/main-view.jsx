//Importing useState for creating annd initializing state
import { useState, useEffect } from "react";
//Importing components for other views
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignUpView/signup-view";
//Importing Bootstrap Components
import { Col, Row } from "react-bootstrap";
//Importing Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
 
    useEffect(() => {
      if (!token) {
        return;
      }
      //Fetches API with movies and maps the data out into the following structure
      fetch("https://secret-peak-11846.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          const moviesFromApi = data.map((movie) => {
            return {
              id: movie._id,
              title: movie.Title,
              description: movie.Description,
              genre: {
                name: movie.Genre.Name,
                description: movie.Genre.Description,
              },
              image: movie.ImagePath,
              director: {
                name: movie.Director.Name,
                bio: movie.Director.Bio,
                birth: movie.Director.Birth,
                death: movie.Director.Death,
              }
            };
          });
        setMovies(moviesFromApi);
      });
    }, [token]);

  return (
    // the following shows the login view and signup view if user is not logged it
    <>
      {!user ? (
        <Col md={5} className="LoginSignup m-3 justify-content-center">
          Welcome to the myFlix Movie App! Please login:
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          Signup:
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        // if the user has selected a movie then it will show the movie view
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {/* Logout Button */}
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </>
      )}
      {/* This displays the movie list if there are no selected movies, there are at least 1 movies and the user is logged in */}
      {!selectedMovie && movies.length > 0 && user && (
        <>
          {movies.map((movie) => (
            <Row className="m-3 justify-content-center">
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Row>
          ))}
        </>
      )}
    </>
  );
};