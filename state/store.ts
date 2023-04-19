import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { load,save } from "redux-localstorage-simple";
import {logger} from "redux-logger";
import reducers from "./reducers";


const PERSISTED_KEYS = ["display","user"]
// const PERSISTED_KEYS = ["board","display"]

const store = configureStore({
    reducer: reducers,

    
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: true,
        })
        .concat(logger)
        .concat(save({ states: PERSISTED_KEYS })),
      preloadedState: load({ states: PERSISTED_KEYS, }),

})


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;