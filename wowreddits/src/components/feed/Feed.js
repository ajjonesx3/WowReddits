import {useState,useEffect} from 'react';
import FeedEntry from '../feedEntry/FeedEntry';
import style from './feed.module.css';
import store,{addToFeed} from '../../store';
import {useSelector,useDispatch} from 'react-redux'; 

const Feed = () => {

    const currentFeed = useSelector(state=>state.store.feedObjs);
    const token = useSelector(state=>state.store.access_token);
    const dispatch = useDispatch();

    let start = token.slice(0,20);

    useEffect(()=>{
        dispatch(addToFeed({
            id:"001",
            data: {
                title:"Test",
                content: "TestContent"
            }
        }));
    },[token])

    return (
        <div className={style.feed}>
            {Object.keys(currentFeed).map(entry=>{
                return <FeedEntry entry={currentFeed[entry]}/>
            })}
        </div>
    )
}

export default Feed;