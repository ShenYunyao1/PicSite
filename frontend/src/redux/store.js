// src/redux/store.js
// 作用：创建 Redux 存储
import { createStore, applyMiddleware } from 'redux';
// 引入 redux-thunk 中间件
// 作用：允许我们 dispatch() 函数返回一个函数，而不是直接传递 action 对象。
// 这样我们就可以在 action 创建函数中执行异步操作，比如发起 AJAX 请求。
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;