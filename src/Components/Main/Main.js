import KanbanBlock from "./KanbanBlock/KanbanBlock";
import style from "./Main.module.css";

const Main = (props) => {
    const { allTasks, openInput, addNewTasksIssue, replaceTasksIssue } = props;

    // for each 4 tasks (backlog, ready, inProgress & finished) make KanbanBlock. Send issues as children
    return (
        <div className="container">
            <div className={style.mainContainer}>
                {allTasks.map((task, index) => (
                    <KanbanBlock
                        key={task.id}
                        task={task}
                        prevTask={allTasks[index - 1] || undefined}
                        openInput={openInput}
                        addNewTasksIssue={addNewTasksIssue}
                        replaceTasksIssue={replaceTasksIssue}
                    >
                        {task.issues.map((issue) => (
                            <div className={style.item} key={issue.id}>
                                {issue.title}
                            </div>
                        ))}
                    </KanbanBlock>
                ))}
            </div>
        </div>
    );
};

export default Main;
