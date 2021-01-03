import style from "./TaskInfo.module.css";
import { Link, withRouter } from "react-router-dom";

const IssueInfo = ({ issue }) => {
    const { title, body, createTime } = issue;
    return (
        <div className={style.issueContainer}>
            <h2 className={style.subtitle}>{title}</h2>
            <div className={style.createTime}>Created: {createTime}</div>

            <div className={style.issueBody}>{body}</div>
        </div>
    );
};

const TaskInfo = ({ allTasks, location, ...props }) => {
    const currentTask = allTasks.find((task) => task.url === location.pathname);
    if (currentTask) {
        return (
            <div className={style.taskContainer}>
                <div className={style.title}>{currentTask.name}</div>
                <div className={style.issuesContainer}>
                    {currentTask.issues.map((issue) => (
                        <IssueInfo issue={issue} key={issue.id} />
                    ))}
                </div>
                <Link className={style.closeButton} to="/"></Link>
            </div>
        );
    } else {
        return (
            <div className={style.taskContainer}>
                <div className={`${style.title} ${style.wrongTitle}`}>
                    Error: this page is not found
                </div>
            </div>
        );
    }
};

export default withRouter(TaskInfo);
