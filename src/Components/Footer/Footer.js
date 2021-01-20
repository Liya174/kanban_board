import style from "./Footer.module.css";

const Footer = ({ allTasks, activeTasks, finishedTasks }) => {
    return (
        <div className={style.footer}>
            <div className="container">
                <div className={style.footerContainer}>
                    <p className={style.tasks}>Active tasks: {activeTasks}</p>
                    <p className={`${style.tasks} ${style.finished}`}>
                        Finished tasks: {finishedTasks}
                    </p>
                    <p>Kanban board by Liia Kozlenko, 2021</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
