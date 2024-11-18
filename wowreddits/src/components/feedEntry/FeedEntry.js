import style from './feedEntry.module.css';

const FeedEntry = ({entry}) => {
    return (
        <div className={style.feedEntry}>
            <div className={style.title}>
                {entry.title}
            </div>
            <div className={style.content}>
                {entry.content}
            </div>
        </div>
    )
}

export default FeedEntry;
