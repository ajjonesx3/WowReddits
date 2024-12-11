import {useState,useEffect} from 'react';
import FeedEntry from '../feedEntry/FeedEntry';
import style from './feed.module.css';
import {addToFeed,fetchFeed, clearFeed,fetchData} from './feedSlice';
import {useSelector,useDispatch} from 'react-redux'; 

const Feed = () => {

    const currentFeed = useSelector(state=>state.feed.feedObjs);
    const token = useSelector(state=>state.store.access_token);
    const loggedIn = useSelector(state=>state.store.userLoggedIn);
    const subreddits = useSelector(state=>state.feed.subreddits);
    const data = useSelector(state=>state.feed.dataFetched);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(true){
            //console.log(token)
            //dispatch(fetchData(token));
            console.log('module loaded');
            subreddits.forEach(sub=>dispatch(fetchFeed(sub)));
            /*
            dispatch(addToFeed({
                id:"gay",
                data:{
                    title:"Reddit sucks",
                    content: "Reddit wont let me use their API"
                }
            }))
            */
        }
    },[subreddits]);

    const dividerStyle = {
        width:"95%",
        height:"1px",
        borderTop:"1px solid black"
    }

    return (
        <div className={style.feed}>
            {Object.keys(currentFeed).map(entry=>{
                return (
                    <>
                        <FeedEntry key={entry} id={entry} entry={currentFeed[entry]}/>
                        <div style={dividerStyle}></div>
                    </>
                )
            })}
        </div>
    )
}

export default Feed;