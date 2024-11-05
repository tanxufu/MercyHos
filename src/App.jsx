import { useContext, useEffect } from 'react';
import './assets/sass/_global.scss';
import useRouter from './useRouter';
import AppContext from './contexts/app.context';
import { LocalStorageEventTarget } from './utils/auth';

function App() {
    const routeElements = useRouter();
    const { reset } = useContext(AppContext);
    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearLS', reset);
        return () => {
            LocalStorageEventTarget.removeEventListener('clearLS', reset);
        };
    }, [reset]);

    return <div>{routeElements}</div>;
}

export default App;
