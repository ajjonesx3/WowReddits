import style from './media.module.css';
import IFrame from './iFrame/IFrame';
import Image from './image/Image';

const Media = ({media}) => {

    /*

    Add gallery type

    {media.type==="gallery" ? <Gallery data={media.data} : undefined}

    A gallery 

    */

    return (
        <div className={style.mediaContainer}>
            {media.type==="iFrame"  ? <IFrame data={media.data} /> : undefined}
            {media.type==="image"   ? <Image  data={media.data} /> : undefined}
            {media.type==="gallery" ? <Image  data={media.data} /> : undefined}
        </div>
    );
}

export default Media;