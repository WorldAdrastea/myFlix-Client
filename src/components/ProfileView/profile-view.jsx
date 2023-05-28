import {Row, Col} from "react-bootstrap";

export const ProfileView = ({ user }) => {
    return (
        <Row>
            User: {user.name}
            Email: {user.email}
        </Row>
    )
}