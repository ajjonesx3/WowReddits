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
                Authorization: "Bearer " + token,
                "User-Agent": "WowReddits/0.1 by yo_smite"
            })
        })
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        } else {
            return {
                error: "unknown error"
            }
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
                console.log("Error occured while fetching data");
            } else {
                console.log("Changing state of dataFetched");
                state.dataFetched = action.payload;
            }
        })
    }
});

export const {addToFeed,clearFeed} = feedSlice.actions;
export default feedSlice.reducer;