import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        // this prevents the default behaviour of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        // Fetches login endpoint with a POST method to match up form's content with vales set in the database (Line 40 onwards)
        fetch("http://ALBV2-640718364.us-east-1.elb.amazonaws.com/login", {
        // fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((err) => {
                console.log("error:", err);
                alert("Something went wrong");
            });
        };

    return (
        <Form onSubmit={handleSubmit} id="loginForm" className="square border rounded border-dark mt-5">
          <Form.Label className="mt-2 mb-2 ms-4 me-4 fw-bold text-decoration-underline"> Log in </Form.Label>
          <Form.Group controlId="formUsername" className="mt-2 mb-2 ms-4 me-4">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3" 
            />
          </Form.Group>
  
          <Form.Group controlId="formPassword" className="mt-2 mb-2 ms-4 me-4">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button id="loginSubmit" variant="primary" type="submit" className="mt-2 mb-2 ms-4 me-4">
            Submit
          </Button>
      </Form>
    );
};