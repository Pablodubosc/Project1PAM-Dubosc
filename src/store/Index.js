import {configureStore} from '@reduxjs/toolkit';
import application from './Reducers';

export default configureStore({

    reducer: {
        application,
    }
})