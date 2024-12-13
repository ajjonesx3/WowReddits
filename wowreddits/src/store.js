import {configureStore,createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import feedSlice from './components/feed/feedSlice';

const initialState = {
    userLoggedIn: false,
    access_token: "",
    refresh_token:"",
    expires_in:100000
}

export const fetchToken = createAsyncThunk(
    'store/fetchToken',
    async (code) => {
        const baseUrl = "https://www.reddit.com/api/v1/access_token"
        const credentials = "4pbmTOK3SMGrJmKE12E5wA:HiAzVVsiqkt03HusNjAfJB8nb6aGYA";
        const uri = "http://localhost:3000/WowReddits";
        const encodedCredentials = btoa(credentials);
        const response = await fetch(baseUrl,{
            method: "POST",
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'code':code,
                'redirect_uri':uri
            }),
            headers: {
                Authorization: "Basic " + encodedCredentials
            }

        })
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return {
                error: "unknown error"
            }
        }

    }
)

export const refreshToken = createAsyncThunk(
    'store/refreshToken',
    async (arg) => {
        const baseUrl = "https://www.reddit.com/api/v1/access_token"
        const credentials = "4pbmTOK3SMGrJmKE12E5wA:HiAzVVsiqkt03HusNjAfJB8nb6aGYA";
        const uri = "http://localhost:3000/WowReddits";
        const encodedCredentials = btoa(credentials);
        const response = await fetch(baseUrl,{
            method: "POST",
            body: new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': arg
            }),
            headers: {
                Authorization: "Basic " + encodedCredentials
            }

        })
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return {
                error: "unknown error"
            }
        }

    }
)

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state,action)=>{
            if(action.payload.error){
                console.log("fetch error");
            } else {
                state.userLoggedIn = true;
                state.access_token = action.payload.access_token;
                state.refresh_token = action.payload.refresh_token;
                state.expires_in = action.payload.expires_in;
            }
        })
        .addCase(refreshToken.fulfilled, (state,action)=>{
            if(action.payload.error){
                console.log("fetch error");
            } else {
                state.access_token = action.payload.access_token;
                state.refresh_token = action.payload.refresh_token;
                state.expires_in = action.payload.expires_in;
            }
        })
    }
});

const store = configureStore({
    reducer: {
        store: storeSlice.reducer,
        feed: feedSlice
    }
})

export const {addToFeed,clearFeed} = storeSlice.actions;
export default store;