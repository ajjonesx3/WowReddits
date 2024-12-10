import style from './feedEntry.module.css';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import Media from '../media/Media';

const FeedEntry = ({id,entry}) => {

    const {title,selftext,author,media,subreddit} = entry;

    const textArea = {
        width:"100%",
        marginTop: "1em"
    }

    const markdownParse = text => {

        const filteredText = text.replace(/\\/gm,"");

        const toHTML = filteredText
		.replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
		.replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
		.replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // bold text
		.replace(/\*([^*]+)\*/gim, '<i>$1</i>') // italic text
        .replace(/\s\s/gim, '<br/>') //line break
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, (match,p1,p2)=>{
            return `<a href="${p2}" target="__blank">${p1}</a>`
        })

        return (<div dangerouslySetInnerHTML={{__html: toHTML.trim()}}></div>)
    }

    return (
        <div id={id} className={style.feedEntry}>
            <div className={style.title}>
                <h3>{"r/"+subreddit}</h3>
                <h3>{"u/"+author}</h3>
                <h2>{title}</h2>
            </div>
            <div className={style.content}>
                {media ? <Media media={media}/> : undefined}
                {selftext ? <div style={textArea}>{markdownParse(selftext)}</div> : null}
            </div>
        </div>
    )
}

export default FeedEntry;
