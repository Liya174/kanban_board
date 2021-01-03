import { Link } from "react-router-dom";

import style from "./Header.module.css";
import userAvatar from "../../img/user-avatar.svg";
import arrowDown from "../../img/arrow-down.svg";
import Menu from "./Menu";

const Header = ({ isMenuVisible, toggleMenuBlock }) => {
    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.headerContainer}>
                    <Link className={style.titleLink} to="/">
                        <h2 className="title">Awesome Kanban Board</h2>
                    </Link>

                    <div className={style.userMenu}>
                        <div
                            className={style.userMenuTitle}
                            onClick={toggleMenuBlock}
                        >
                            <img
                                className={style.userAvatar}
                                src={userAvatar}
                                alt="avatar"
                            />

                            <button
                                className={`${style.button} ${
                                    isMenuVisible ? style.opened : ""
                                }`}
                            >
                                <img src={arrowDown} alt="v" />
                            </button>
                        </div>
                        {isMenuVisible && <Menu />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
