import { createSlice } from '@reduxjs/toolkit';

export const Reducers = createSlice({
    name: 'application',
    initialState:{
        searchModalVisible : false,
        modalItem : "",
        modalCharacterVisible : false,
    },
    reducers:{
        setSearchModalVisible: (state,action) =>
        {
            state.searchModalVisible = action.payload;
        },
        setModalItem: (state,action) =>
        {
            state.modalItem = action.payload;
        },
        setModalCharacterVisible: (state,action) =>
        {
         state.modalCharacterVisible = action.payload;
        },
    }
})

export const {setSearchModalVisible, setModalItem, setModalCharacterVisible,  } = Reducers.actions;

export default Reducers.reducer;