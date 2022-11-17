import { createSlice } from '@reduxjs/toolkit';

export const Reducers = createSlice({
    name: 'application',
    initialState:{
        searchModalVisible : false,
        modalItem : "",
        modalCharacterVisible : false,
        lastFilter : 'name',
        lastFilterOptions : ['name', 'species', 'type'],
        genderFilter : 'no gender',
        genderFilterOptions: ['no gender','male', 'female', 'unknown', 'genderless'],
        statusFilter : 'no status',
        statusFilterOptions: ['no status','alive', 'dead', 'unknown'],
        favs : [],
        data: []
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
        setFilters:(state,action) =>
        {
            if((state.lastFilterOptions).indexOf(action.payload) != -1)
            {
                state.lastFilter = action.payload
            }
            else if((state.genderFilterOptions).indexOf(action.payload) != -1)
            {
                state.genderFilter = action.payload
            }
            else if((state.statusFilterOptions).indexOf(action.payload) != -1)
            {
                state.statusFilter = action.payload
            }
        },
        resetFilters:(state,action) =>
        {
            state.genderFilter = 'no gender'
            state.statusFilter = 'no status'
            state.lastFilter = 'name'
        },
        setFavs:(state,action) =>
        {
            state.favs = action.payload
        },
        setData:(state,action) =>
        {
            state.data = action.payload
        },
    }
})


export const {setSearchModalVisible, setModalItem, setModalCharacterVisible, setFilters, resetFilters, setFavs,setData } = Reducers.actions;

export default Reducers.reducer;
