import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    subreddits: ["CompetitiveWow"],
    feedObjs: {},
    dataFetched: {}
}

export const fetchData = createAsyncThunk(
    'feed/fetchData',
    async (token) => {
        const baseUrl = "https://www.oauth.reddit.com"
        const endpoint = "/api/v1/me";
        const fullUrl = baseUrl + endpoint;
        const response = await fetch(fullUrl,{
            method: "GET",
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        })
        if(response.ok){
            const jsonResponse = response.json();
            return jsonResponse;
        } else {
            return {error:response.status}
        }
    }
)

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addToFeed(state,action){
            state.feedObjs = {
                ...state.feedObjs,
                [action.payload.id]:action.payload.data
            }
        },
        clearFeed(state){
            state.feedObjs = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state,action)=>{
            if(action.payload.error){
                console.log("Response code: " + action.payload.error);
            } else {
                console.log("Changing state of dataFetched");
                state.dataFetched = action.payload;
            }
        })
    }
});

export const {addToFeed,clearFeed} = feedSlice.actions;
export default feedSlice.reducer;