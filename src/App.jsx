import './assets/sass/_global.scss';
import useRouter from './useRouter';

function App() {
    const routeElements = useRouter();
    return <div>{routeElements}</div>;
}

export default App;
