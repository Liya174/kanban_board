import KanbanBlock from "./KanbanBlock/KanbanBlock";
import style from "./Main.module.css";
import { useState } from "react";

const Main = (props) => {
    const { allTasks, openInput, addNewTasksIssue } = props;

    // for each 4 tasks (backlog, ready, inProgress & finished) make KanbanBlock. Send issues as children
    return (
        <div className="container">
            <div className={style.mainContainer}>
                {allTasks.map((task, index) => (
                    <KanbanBlock
                        key={task.id}
                        blockTitle={task.name}
                        tasksId={task.id}
                        isAbbButtonClicked={task.isAbbButtonClicked}
                        openInput={openInput}
                        prevTask={allTasks[index - 1] || undefined}
                        addNewTasksIssue={addNewTasksIssue}
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
