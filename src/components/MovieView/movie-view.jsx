import { Container } from 'react-bootstrap';
//import movie-view styling
import './movie-view.scss';
import Row from 'react-bootstrap/Row';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Container >
            <Row md={8} style={{ border: "1px solid black"}}>
                <Row>
                    <img src={movie.image} alt={movie.title}/>
                </Row>

                <Row className="movie-title">
                    <span>Title: </span>
                    <span>{movie.title}</span>
                </Row>

                <Row className="movie-desc">
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
                <button 
                    onClick={onBackClick}
                    className="back-button"
                    style={{cursor: "pointer"}}
                >Back</button>
                </Row>
            </Row>
        </Container>
    );
};