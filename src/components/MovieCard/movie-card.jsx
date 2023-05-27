import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="col-6">
            <Card.Img 
                variant="top" 
                src={movie.image} 
                alt={movie.title}
            />
            <Card.Body>
                <Card.Title className="card-title">Title: {movie.title}</Card.Title>
                <Card.Text className="card-text">Director: {movie.director.name}</Card.Text>
                <Button 
                    onClick={() => onMovieClick(movie)} 
                    variant="primary"
                    style={{cursor: "pointer"}}
                >
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
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
    onMovieClick: PropTypes.func.isRequired
};