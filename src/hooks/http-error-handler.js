import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);
    // state = {
    //     error: null
    // };
    // will be called before the child components render

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err)
    });
    // we call this lifecycle when a component isn't required anymore
    // helps to prevent memory leaks
    // think of useEffect Hook as componentDidMount, componentDidUpdate, and
    // componentWillUnmount combined.
    // main function when mounts and then cleanup function when unmounts
    useEffect(() => {
        return () => {
            console.log('Will Unmount', reqInterceptor, resInterceptor);
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler]
};
