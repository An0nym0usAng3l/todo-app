import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import todoSlice from './slices/todoSlice'

// const apiMiddleWare = () => (next) => async (action) => {
//     console.log(action.api, action['api'])
//     if (action.api) {
//         const { method, url, data } = action.api;
//         const response = await fetch(url, {
//             method,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: data && JSON.stringify(data),
//         });
//         const responseData = await response.json();
//         next({ type: action.type, payload: responseData });
//     } else {
//         next(action);
//     }
// }

const middleware = (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    //  apiMiddleWare
]

export default configureStore({
    reducer: {
        todos: todoSlice
    },
    middleware
})



