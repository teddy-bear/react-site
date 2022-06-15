import {Link, useMatch, useResolvedPath} from "react-router-dom";

function MenuLink(props) {
    let resolved = useResolvedPath(props.to);
    let match = useMatch({path: resolved.pathname, end: true});

    let cssClass = match ? ' nav-link active' : 'nav-link';

    return (
        <li className='nav-item'>
            <Link
                to={props.to}
                className={cssClass}
            >
                {props.children}
            </Link>
        </li>
    );
}

export default MenuLink;
