// Creates root of project
import config from './config';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

//Import myFlix-client.scss
import './index.scss';

const indexHtmlUrl = `${config.S3_BUCKET_URL}/dist/index.html`; 

//Main component (will eventually use all the others)
const App = () => {
    return (
        <Container>
            <MainView />
            <a href={indexHtmlUrl}>Link to index.html</a>
        </Container>
    );
};

//Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render your app in the root DOM element
root.render(<App />);