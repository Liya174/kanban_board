import React from "react";
import { Link } from "react-router-dom";

import style from "./KanbanBlock.module.css";
import KanbanButtons from "./KanbanButtons";
import BacklogBlockInputAndButton from "./BacklogBlockInputAndButton";
import KanbanDropdownInput from "./KanbanDropdownInput";

const KanbanBlock = ({
    task,
    prevTask,
    openInput,
    addNewTasksIssue,
    replaceTasksIssue,
    ...props
}) => {
    //structure: issues-list, input for adding issue, add-button
    return (
        <div className={style.block}>
            <Link className={style.blockLink} to={task.url}>
                <p>{task.name}</p>
            </Link>
            <div className={style.blockInfo}>
                <div className={style.blockInfoWithoutScroll}>
                    {React.Children.toArray(props.children)}

                    {task.name === "Backlog" ? (
                        <BacklogBlockInputAndButton
                            addNewTasksIssue={addNewTasksIssue}
                            isAbbButtonClicked={task.isAbbButtonClicked}
                            openInput={openInput}
                            tasksId={task.id}
                        />
                    ) : (
                        <>
                            <KanbanButtons
                                isAbbButtonClicked={task.isAbbButtonClicked}
                                prevTask={prevTask}
                                openInput={openInput}
                                tasksId={task.id}
                            />
                        </>
                    )}
                </div>
            </div>
            {task.isAbbButtonClicked && task.name !== "Backlog" && (
                <KanbanDropdownInput
                    prevTask={prevTask}
                    replaceTasksIssue={replaceTasksIssue}
                    tasksId={task.id}
                />
            )}
        </div>
    );
};

export default KanbanBlock;
