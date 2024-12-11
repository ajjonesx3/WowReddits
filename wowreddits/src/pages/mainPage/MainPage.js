import style from './mainPage.module.css';
import Feed from '../../components/feed/Feed';
import {useSelector,useDispatch} from 'react-redux'; 
import {useState,useEffect} from 'react';
import {fetchFeed} from '../../components/feed/feedSlice'

const MainPage = () => {

    const subreddits = useSelector(state=>state.feed.subreddits);
    const subredditUrl = "https://www.reddit.com/r/"
    const dispatch = useDispatch();

    useEffect(()=>{
        subreddits.forEach(sub=>dispatch(fetchFeed(sub)));
    },[subreddits]);

    return (
        <div className={style.mainPage}>
            <div className={style.leftColumn}>
                <div className={style.leftColumnTitle}>
                    <h2>Subreddits</h2>
                </div>
                <ul className={style.subreddits}>
                    {subreddits.map(subreddit=>(<a target={"__blank"} href={subredditUrl+subreddit}><li>{subreddit}</li></a>))}
                    <div onClick={()=>{alert('This feature is not implemented yet!')}}className={style.addSubButton}>
                    +
                    </div>
                </ul>
            </div>
            <div className={style.rightSide}>
                <Feed />
            </div>
        </div>
    )
}

export default MainPage;