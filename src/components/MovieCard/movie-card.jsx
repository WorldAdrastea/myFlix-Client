import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card>
            <Card.Img 
                variant="top" 
                src={movie.image} 
                alt={movie.title}
            />
            <Card.Body>
                <Card.Title>Title: {movie.title}</Card.Title>
                <Card.Text>Director: {movie.director.name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            description: PropTypes.string,
            name: PropTypes.string.isRequired
        }),
        image: PropTypes.string.isRequired,
        director: PropTypes.shape({
            bio: PropTypes.string,
            birth: PropTypes.string,
            death: PropTypes.string,
            name: PropTypes.string.isRequired,
        })
    }).isRequired,
};