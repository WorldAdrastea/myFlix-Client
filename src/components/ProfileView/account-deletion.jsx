import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import { Row, Col, Form, Button } from "react-bootstrap";


export const AccountDeletion = ({ user, token, onRemoval }) => {
    const [Account, setAccount] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();

        if (Account === user.Username) {
            fetch(`https://secret-peak-11846.herokuapp.com/users/${user.Username}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "DELETE"
            }).then((response) => {
                if (response.ok) {
                    alert("Deletion successful");
                    window.location.reload();
                } else {
                    alert("Deletion failed");
                }
            });
        }
    }

    return (
        <Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>Account Deletion</Col>
                </Row>
                <Row>
                    <FormGroup controlId="fromAccountDelete">
                        <Form.Label>Enter your password:</Form.Label>
                        <Form.Control
                            type="text"
                            value={Account}
                            onChange={(e) => setAccount(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button className="mt-2 mb-2" type="submit" variant="danger"> Delete Account</Button>
                </Row>
            </Form>
        </Row>
    )
}