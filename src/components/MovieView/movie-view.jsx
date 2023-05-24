import { Container } from 'react-bootstrap';
//import movie-view styling
import './movie-view.scss';
import Row from 'react-bootstrap/Row';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Container className="">
            <Row md={8} style={{ border: "1px solid black"}}>
                <Row>
                <div>
                    <img src={movie.image} alt={movie.title}/>
                </div>
                </Row>

                <Row className="movie-title">
                <div>
                    <span>Title: </span>
                    <span>{movie.title}</span>
                </div>
                </Row>

                <Row className="movie-desc">
                <div>
                    <span>Description: </span>
                    <span>{movie.description}</span>
                </div>
                </Row>

                <Row>
                <div>
                    <span>Genre: </span>
                    <span>{movie.genre.name}</span>
                </div>
                </Row>

                <Row>
                <div>
                    <span>Director: </span>
                    <span>{movie.director.name}</span>
                </div>
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