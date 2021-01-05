import style from "./TaskInfo.module.css";
import { Link, withRouter } from "react-router-dom";
import IssueInfo from "./IssueInfo";

const TaskInfo = ({
    allTasks,
    location,
    changeIssueBody,
    deleteIssue,
    ...props
}) => {
    const currentTask = allTasks.find((task) => task.url === location.pathname);
    if (currentTask) {
        return (
            <div className={style.taskContainer}>
                <div className={style.title}>{currentTask.name}</div>
                <div className={style.issuesContainer}>
                    {currentTask.issues.map((issue) => (
                        <IssueInfo
                            issue={issue}
                            taskName={currentTask.name}
                            key={issue.id}
                            changeIssueBody={changeIssueBody}
                            deleteIssue={deleteIssue}
                        />
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
