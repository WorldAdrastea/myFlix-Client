import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

export const ProfileView = ({ user, token, updateUser, movies }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthdate,
        };

        console.log("data:", data); // Add this console log

        fetch(`https://secret-peak-11846.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
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
                Birthday: {user.Birthday ? new Date(user.Birthday).toLocaleDateString("en-GB") : ""}
            </Col>
            <Col>
                Favourite Movies:
                {user.FavoriteMovies.map((movieId) => {
                    const movie = movies.find((m) => m.id === movieId);
                    if (movie) {
                        return (
                        <div key={movie.id}>
                            <div>{movie.title}</div>
                        </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </Col>
            
            {/* displays the forms to allow user to update information */}
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

                    <Button className="mt-2 mb-2" type="submit">Save Changes</Button>
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