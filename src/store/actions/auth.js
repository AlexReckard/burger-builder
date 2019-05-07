// import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    // handle with redux saga
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INIT_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // };
};

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    };
    // now in sagas
    // return dispatch => {
        // dispatch(authStart());
        // const authData = {
        //     email: email,
        //     password: password,
        //     returnSecureToken: true
        // };
        // // [security purposes auth key is gone]
        // // remove this before pushing to remote
        // // url to sign up page
        // let url = '';
        // if (!isSignup) {
        //     // url to sign in page
        //     url = '';
        // };
        // axios.post(url, authData)
        // .then(response => {
        //     const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        //     localStorage.setItem('token', response.data.idToken);
        //     localStorage.setItem('expirationDate', expirationDate);
        //     localStorage.setItem('userId', response.data.localId);
        //     dispatch(authSuccess(response.data.idToken, response.data.localId));
        //     dispatch(checkAuthTimeout(response.data.expiresIn));
        // })
        // .catch(err => {
        //     dispatch(authFail(err.response.data.error))
        // });
    // };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
// authentication criteria
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
    // now in sagas
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate <= new Date()) {
    //             dispatch(logout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout((expirationDate.getSeconds() - new Date().getSeconds()) / 1000));
    //         };
    //     };
    // };
};
