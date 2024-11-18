import './header.css';
import redditLogo from '../../assets/reddit.svg';
import wowLogo from '../../assets/wow.svg';

const Header = () => {

    const logoSize = {
        width: "13em",
        height: "auto"
    }
    const logoSize2 = {
        width:"5.85em",
        height:"auto",
        padding:"24px 50px"
    }

    return (
        <div className="header">
            <img src={redditLogo} alt="reddit logo" style={logoSize}/>
            <h1>Wow Reddits</h1>
            <img src={wowLogo} alt="wow logo" style={logoSize2}/>


        </div>
    )
}

export default Header;