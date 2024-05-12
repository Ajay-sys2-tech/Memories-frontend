import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index';

export const signin = (formData, navigate, setError, setErrorMessage) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate("/");
    }catch(error){
        setError(true);
        setErrorMessage(error.response.data.message);
        console.log(error);
    }
}

export const signup = (formData, navigate, setError, setErrorMessage) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        console.log(data);
        dispatch({ type: AUTH, data });

        navigate("/");
    }catch(error){
        setError(true);
        setErrorMessage(error.message);
        console.log(error);
    }
}