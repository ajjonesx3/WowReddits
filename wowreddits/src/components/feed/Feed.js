import {useState,useEffect} from 'react';
import FeedEntry from '../feedEntry/FeedEntry';
import style from './feed.module.css';
import {addToFeed,clearFeed,fetchData} from './feedSlice';
import {useSelector,useDispatch} from 'react-redux'; 

const Feed = () => {

    const currentFeed = useSelector(state=>state.feed.feedObjs);
    const token = useSelector(state=>state.store.access_token);
    const loggedIn = useSelector(state=>state.store.userLoggedIn);
    const subreddits = useSelector(state=>state.feed.subreddits);
    const data = useSelector(state=>state.feed.dataFetched);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(loggedIn){
            dispatch(fetchData(token));
        } else {
            dispatch(clearFeed);//check this for errors later
        }
    },[loggedIn,dispatch,token]);

    return (
        <div className={style.feed}>
            {Object.keys(currentFeed).map(entry=>{
                return <FeedEntry entry={currentFeed[entry]}/>
            })}
        </div>
    )
}

export default Feed;