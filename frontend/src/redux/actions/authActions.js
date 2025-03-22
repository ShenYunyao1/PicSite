// src/redux/actions/authActions.js
// 作用：定义redux action，用于处理用户登录、注册等操作
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('/api/auth/login', { email, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
};

export const register = (username, email, password) => async (dispatch) => {
    try {
        const response = await axios.post('/api/auth/register', { username, email, password });
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
    }
};