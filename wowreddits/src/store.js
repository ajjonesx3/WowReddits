import {configureStore,createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    userLoggedIn: false,
    feed: {},
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
        const jsonResponse = await response.json();
        return jsonResponse;

    }
)

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addToFeed(state,action){
            state.feed[action.payload.id] = action.payload;
        },
        clearFeed(state){
            state.feed = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state,action)=>{
            state.userLoggedIn = true;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.expires_in = action.payload.expires_in;
        })
    }
});

const store = configureStore({
    reducer: {
        store: storeSlice.reducer
    }
})

export const {addToFeed,clearFeed} = storeSlice.actions;
export default store;