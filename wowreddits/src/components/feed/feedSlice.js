import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    subreddits: ["CompetitiveWow","wow"],
    feedObjs: {},
    dataFetched: {}
}

const parse = str => {
    return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}

const createFeedObject = (state,payload) => {
    if(payload.kind == "Listing"){

        payload.data.children.forEach(child=>{
            let data = child.data;
            if(data.author!=="AutoModerator"){
                //console.log(data);

                let nfo = {
                    title: data.title,
                    author: data.author,
                    selftext: parse(data.selftext),
                    subreddit: data.subreddit,
                    media: {}
                }
                if(data.post_hint === "image"){
                    nfo.media.type = "image";
                    nfo.media.data = {
                        srcUrl: data.url
                    }
                }
                if(data.media){
                    nfo.media.type = "iFrame";
                    nfo.media.data = {
                        ratio: data.media.oembed.height / data.media.oembed.width,
                        html: data.media.oembed.html
                    }
                }
                if(data.gallery_data){
                    nfo.media.type = "gallery";
                    //replace below to set to nfo.media.data
                    let temp = data.gallery_data.items.map(item=>{
                        const mediaObj = data.media_metadata[item.media_id];
                        const retObj = {
                            type: mediaObj.e,
                            srcUrl: mediaObj.s.u ?? mediaObj.s.gif
                        }
                        return retObj;
                    })
                    //remove this when gallery made
                    nfo.media.data = {
                        srcUrl: temp[0].srcUrl
                    }
                }

                state.feedObjs[data.id] = nfo
            }
        })

    }

}

export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async (subreddit) => {
        const url = "https://www.reddit.com/r/" + subreddit + '.json';
        console.log(`Fetching ${subreddit}`);
        const response = await fetch(url,{
            method: "GET"
        });
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return {error:response.status};
        }
    }
)

export const fetchData = createAsyncThunk(
    'feed/fetchData',
    async (token) => {
        const baseUrl = "https://www.oauth.reddit.com"
        const endpoint = "/api/subreddit_autocomplete";
        const queries = "";
        const fullUrl = baseUrl + endpoint + queries;
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
        }
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
        builder.addCase(fetchFeed.fulfilled, (state,action)=>{
            if(action.payload.error){
                console.log("Response code: " + action.payload.error);
            } else {
                createFeedObject(state,action.payload);
            }
        })
    }
});

export const {addToFeed,clearFeed} = feedSlice.actions;
export default feedSlice.reducer;