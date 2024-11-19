import {useState,useEffect} from 'react';
import FeedEntry from '../feedEntry/FeedEntry';
import style from './feed.module.css';
import store from '../../store';

const Feed = () => {

    const entry1 = {
        title: "Guy kills boar",
        content: "wow look at this guy kill a boar"
    }

    const feed = store.getState().store.feed;

    return (
        <div className={style.feed}>
            {Object.keys(feed).map(entry=>{
                return <FeedEntry entry={entry}/>
            })}
        </div>
    )
}

export default Feed;