import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
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