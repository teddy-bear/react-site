import React, {useState, useEffect} from "react";
import {publish, subscribe, unsubscribe} from "../../events";
import {Link} from "react-router-dom";

export default function Footer() {

    const [isClicked, setClicked] = useState(false);
    const [footerInfo, setFooterInfo] = useState({});

    useEffect(() => {
        subscribe("copy", (data) => setClicked(!data.detail));
        subscribe("footer", (data) => setFooterInfo(data));

        return () => {
            unsubscribe("copy");
            unsubscribe("footer");
        }
    }, [])

    const copyCall = () => {
        publish('copy', isClicked);
    }
    const footerCall = () => {
        publish('footer');
    }

    return (
        <footer onClick={footerCall}>
            <span onClick={copyCall} className='ft-link'>Copyright Mike 2022</span>
            <Link to='/contact'>
                contacts
            </Link>
        </footer>
    )
}
