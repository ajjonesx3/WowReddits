import style from './feedEntry.module.css';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

const FeedEntry = ({entry}) => {

    const {title,content} = entry;

    return (
        <div className={style.feedEntry}>
            <div className={style.title}>
                {title}
            </div>
            <div className={style.content}>
                {content}
            </div>
        </div>
    )
}

export default FeedEntry;
