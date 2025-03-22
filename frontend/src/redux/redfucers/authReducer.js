// src/redux/reducers/authReducer.js
// 作用：管理用户登录状态

const initialState = {
    user: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return { ...state, user: action.payload, error: null };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;