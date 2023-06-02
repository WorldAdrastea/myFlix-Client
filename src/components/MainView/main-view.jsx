//Importing useState for creating annd initializing state
import React from "react";
import { useState, useEffect } from "react";
//Importing components for other views
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignUpView/signup-view";
import { NavigationBar } from "../NavigationBar/navigation-bar";
import { ProfileView } from "../ProfileView/profile-view";
import { AccountDeletion } from "../ProfileView/account-deletion";
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

  const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    } 

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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                      movies={movies}
                      user={user}
                      updateUser={setUser}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                {user ? (
                  <Col>
                    <ProfileView
                      user={user}
                      updateUser={updateUser}
                      token={token}
                      movies={movies}
                    />
                    <AccountDeletion
                      user={user}
                      token={token}
                      onRemoval={() => {
                        setUser(null),
                        setToken(null),
                        localStorage.clear();
                      }}
                    />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Row className="mb-4" key={movie.id}>
                        <MovieCard movie={movie} />
                      </Row>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};