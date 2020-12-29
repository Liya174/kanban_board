import style from "./Header.module.css";
import userAvatar from "../../img/user-avatar.svg";
import arrowDown from "../../img/arrow-down.svg";

const Header = () => {
    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.headerContainer}>
                    <h2 className="title">Awesome Kanban Board</h2>

                    <img
                        className={style.userAvatar}
                        src={userAvatar}
                        alt="avatar"
                    />

                    <button className={style.button}>
                        <img src={arrowDown} alt="v" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
