import { Link } from "react-router-dom";

import style from "./Header.module.css";

const Menu = () => {
    return (
        <>
            <div className={`${style.rectangle} ${style.active}`}></div>
            <div className={`${style.listBlock} ${style.active}`}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <Link to="/">My account</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/">My tasks</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/">Settings</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Menu;
