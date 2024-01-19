import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import statusReducer from "./statusSlice";
import yourStatusReducer from "./yourStatusSlice";
import sanPhamReducer from "./sanPhamSlice";
import ttShopReducer from "./ttShopSlice";
import donHangReducer from "./donHangSlice";
import gioHangReducer from "./gioHangSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    post: postReducer,
    status: statusReducer,
    yourStatus: yourStatusReducer,
    sanPham: sanPhamReducer,
    ttShop: ttShopReducer,
    donHang: donHangReducer,
    gioHang: gioHangReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export let persistor = persistStore(store);
