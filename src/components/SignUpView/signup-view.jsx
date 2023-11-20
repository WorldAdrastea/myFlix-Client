import { useState } from "react";
import {Button, Form} from "react-bootstrap";

export const SignupView = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const[birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        fetch("http://ALBV2-640718364.us-east-1.elb.amazonaws.com/users", {
        // fetch("http://localhost:8080/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} id="signUpForm" className="square border rounded border-dark mt-5">
            <Form.Label className="mt-2 mb-2 ms-4 me-4 fw-bold text-decoration-underline"> Sign up </Form.Label>
            <Form.Group className="mt-2 mb-2 ms-4 me-4">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group className="mt-2 mb-2 ms-4 me-4">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mt-2 mb-2 ms-4 me-4">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mt-2 mb-2 ms-4 me-4">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit" className="mt-2 mb-2 ms-4 me-4">Submit</Button>
        </Form>
    );
};