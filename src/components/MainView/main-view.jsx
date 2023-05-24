//Importing useState for creating annd initializing state
import { useState, useEffect } from "react";
//Importing components for other views
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignUpView/signup-view";
//Importing Bootstrap Components
import { Col, Row, Stack } from "react-bootstrap";


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
      //Fetches API with movies
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
    <>
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
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
          <div>The list is empty!</div>
        </>
      )}
      {!selectedMovie && movies.length > 0 && (
        <>
          {/* Logout button */}
          <Row>
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </Row>

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