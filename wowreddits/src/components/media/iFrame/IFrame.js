import style from './iFrame.module.css';

const parse = str => {
    return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}

const IFrame = ({data}) => {

    const iFrameHolderStyle = {
        position:"relative",
        width:"95%",
        height: 0,
        paddingBottom: data.ratio * 100 + "%",
    }

    return (
        <div className={style.iFrameHolder} style={iFrameHolderStyle} dangerouslySetInnerHTML={{__html: parse(data.html)}}>     
        </div>
    )


    
}

export default IFrame;