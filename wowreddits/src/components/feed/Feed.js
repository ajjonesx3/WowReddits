import {useState,useEffect} from 'react';
import FeedEntry from '../feedEntry/FeedEntry';
import style from './feed.module.css';
import {useSelector,useDispatch} from 'react-redux'; 

const Feed = () => {

    const currentFeed = useSelector(state=>state.feed.feedObjs);
    const subreddits = useSelector(state=>state.feed.subreddits);

    const dividerStyle = {
        width:"95%",
        height:"1px",
        borderTop:"1px solid black"
    }

    const [keysArray, setKeysArray] = useState([]);

    useEffect(()=>{
        setKeysArray(()=>{
            return Object.keys(currentFeed).sort((a,b)=>{
                return currentFeed[a].created - currentFeed[b].created;
            })
        })
    },[currentFeed]);

    return (
        <div className={style.feed}>
            {keysArray.map(entry=>{
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