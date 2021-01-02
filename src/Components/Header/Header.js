import style from "./Header.module.css";
import userAvatar from "../../img/user-avatar.svg";
import arrowDown from "../../img/arrow-down.svg";

const Menu = () => {
    return (
        <>
            <div className={`${style.rectangle} ${style.active}`}></div>
            <div className={`${style.listBlock} ${style.active}`}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <a href="/">My account</a>
                    </li>
                    <li className={style.item}>
                        <a href="/">My tasks</a>
                    </li>
                    <li className={style.item}>
                        <a href="/">Settings</a>
                    </li>
                </ul>
            </div>
        </>
    );
};

const Header = ({ isMenuVisible, toggleMenuBlock }) => {
    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.headerContainer}>
                    <h2 className="title">Awesome Kanban Board</h2>
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
