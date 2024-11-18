import {useState,useEffect} from 'react';
import FeedEntry from '../feedEntry/FeedEntry';
import style from './feed.module.css';

const Feed = () => {

    const entry1 = {
        title: "Guy kills boar",
        content: "wow look at this guy kill a boar"
    }

    const entries_fake = [];
    entries_fake.push(entry1);


    return (
        <div className={style.feed}>
            {entries_fake.map(entry=>{
                return <FeedEntry entry={entry}/>
            })}
        </div>
    )
}

export default Feed;