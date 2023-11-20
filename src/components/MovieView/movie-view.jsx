import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//import movie-view styling
import './movie-view.scss';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import { ImageUpload } from "../ImageUpload/ImageUpload";

export const MovieView = ({ user, movies, updateUser, token }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    const [madeFavourite, setFavourite] = useState(user.FavoriteMovies.includes(movie.id) || false);

    useEffect(() => {
        if (user && user.FavoriteMovies && movie) {
          setFavourite(user.FavoriteMovies.includes(movieId));
        }
    }, [user, movie]);

    const addFavourite = () => {
        fetch(`http://ALBV2-640718364.us-east-1.elb.amazonaws.com/users/${user.Username}/movies/${movieId}`, {
        // fetch(`http://localhost:8080/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully added to favorites");
                setFavourite(true);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavourite = () => {
        fetch(`http://ALBV2-640718364.us-east-1.elb.amazonaws.com/users/${user.Username}/movies/${movieId}`, {
        // fetch(`http://localhost:8080/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully deleted from favorites");
                setFavourite(false);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <Container>
            <Row md={8} style={{ border: "1px solid black"}}>
                <Row>
                    <img src={movie.image} alt="Movie Image"/>
                </Row>

                <Row>
                    <span>Title: {movie.title}</span>
                </Row>

                <Row>
                    <span>Description: {movie.description}</span>
                </Row>

                <Row>
                    <span>Genre: {movie.genre.name}</span>
                </Row>

                <Row>
                    <span>Director: {movie.director.name}</span>
                </Row>

                <Row>
                    <Link to={'/'}>
                        <Button className="back-button">Back</Button>
                    </Link>
                </Row>
                <Row>
                {madeFavourite ? (
                        <Button variant="danger" className="mt-2 mb-2 ms-2" onClick={removeFavourite}>
                            Remove from favorites
                        </Button>
                    ) : (
                        <Button variant="success" className="mt-2 mb-2 ms-2" onClick={addFavourite}>
                            Add to favorites
                        </Button>
                )}
                </Row>
                <Row>
                    <ImageUpload
                        token={token}
                    />
                </Row>
            </Row>
        </Container>
    );
};