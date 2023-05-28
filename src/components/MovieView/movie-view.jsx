import { useParams } from "react-router";
import { Link } from "react-router-dom";

//import movie-view styling
import './movie-view.scss';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    console.log("movies:", movies);
    console.log("movieId:", movieId);

    const movie = movies.find((m) => m.id === movieId);

    console.log("movie:", movie);

    return (
        <Container>
            <Row md={8} style={{ border: "1px solid black"}}>
                <Row>
                    <img src={movie.image} alt="Movie Image"/>
                </Row>

                <Row>
                    <span>Title: </span>
                    <span>{movie.title}</span>
                </Row>

                <Row>
                    <span>Description: </span>
                    <span>{movie.description}</span>
                </Row>

                <Row>
                    <span>Genre: </span>
                    <span>{movie.genre.name}</span>
                </Row>

                <Row>
                    <span>Director: </span>
                    <span>{movie.director.name}</span>
                </Row>

                <Row>
                    <Link to={'/'}>
                        <Button className="back-button">Back</Button>
                    </Link>
                </Row>
            </Row>
        </Container>
    );
};