


const Image = ({data}) => {


    const imgStyle = {
        width: "95%",
        height: "auto"
    }

    const imageContainer = {
        width:"100%",
        height:"auto",
        display:"flex",
        justifyContent:"center"
    }


    return ( 
        <div style={imageContainer}>
            <img style={imgStyle} src={data.srcUrl}/>
        </div>
    )

}

export default Image