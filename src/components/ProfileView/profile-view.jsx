import { Row, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";
import { useState } from "react";

export const ProfileView = ({ user, favouriteMovieList, token, favouriteMovies, updateUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            password,
            email,
            birthdate
        }

        console.log("data:", data); // Add this console log

        fetch(`https://secret-peak-11846.herokuapp.com/users/${user._id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Change failed");
                return false;
            }
        }).then(updatedUser => {
                console.log("updatedUser:", updatedUser);
                setConfirmation("Change Successful");
                updateUser(updatedUser); // Update the user state with the updated user information
                window.location.reload();
        }).catch(err => {
            console.log("error:", err);
            setConfirmation(err.message);
        });
    }
    
    return (
        <Row>
            <Col>
                User: {user.Username}
            </Col>
            <Col>
                Email: {user.Email}
            </Col>
            <Col>
                Birthday: {user.Birthday}
            </Col>
            <Col>
                Favourite Movies: {favouriteMovieList.map((movie) => {
                    return (
                    <Row key={movie._id}>
                        <MovieCard 
                            movies={movie}
                            user={user} 
                            token={token} 
                            favouriteMovies={favouriteMovies} 
                        />
                    </Row>
                    )
                    })
                }
            </Col>

            <Row>
                <Form onSubmit={handleSubmit}> 
                    <Form.Label>Username:</Form.Label>
                        <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />

                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <Form.Label>Birthdate:</Form.Label>
                        <Form.Control
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        />

                        <Button type="submit">Save Changes</Button>
                </Form>
            </Row>

            {confirmation && (
                <Row>
                    <Col>{confirmation}</Col>
                </Row>
            )}
        </Row>
    )
}