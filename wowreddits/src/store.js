import {configureStore,createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    userLoggedIn: false,
    feed: {},
    authData: {}
}

const fetchToken = createAsyncThunk(
    'store/fetchToken',
    async (code,thunkAPI) => {
        const baseUrl = "https://www.reddit.com/api/v1/access_token"
        const response = await fetch(baseUrl,{
            method: "POST",
            body: JSON.stringify({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "https://ajjonesx3.github.io/WowReddits"
            }),
            header: {
                client_id: "4pbmTOK3SMGrJmKE12E5wA",
                client_secret: "HiAzVVsiqkt03HusNjAfJB8nb6aGYA",
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
            state.authData = action.payload;
            console.log(action.payload);
        })
    }
});

const store = configureStore({
    reducer: {
        store: storeSlice.reducer
    }
})

export const {addToFeed,clearFeed} = storeSlice.actions;
export {fetchToken};
export default store;