import {useState,useEffect} from 'react';
import FeedEntry from '../feedEntry/FeedEntry';
import style from './feed.module.css';

const Feed = () => {

    const entry1 = {
        title: "Guy kills boar",
        content: "wow look at this guy kill a boar"
    }

    const entry2 = {
        title: "Guy gets cutting edge",
        content: "This guy got cutting edge on Raszageth wow!"
    }

    const entries = [];
    entries.push(entry1);
    entries.push(entry2);

    return (
        <div className={style.feed}>
            {entries.map(entry=>{
                return <FeedEntry entry={entry}/>
            })}
        </div>
    )
}

export default Feed;