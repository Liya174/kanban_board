import React from "react";
import { Link } from "react-router-dom";

import style from "./KanbanBlock.module.css";
import KanbanButtons from "./KanbanButtons";
import BacklogBlockInputAndButton from "./BacklogBlockInputAndButton";
import KanbanDropdownInput from "./KanbanInput";

const KanbanBlock = ({
    task,
    prevTask,
    openInput,
    addNewTasksIssue,
    ...props
}) => {
    //structure: issues-list, input for adding issue, add-button
    return (
        <div
            className={`${style.block} ${task.id === 3 ? style.blockLast : ""}`}
        >
            <Link className={style.blockLink} to={task.url}>
                <p>{task.name}</p>
            </Link>
            <div
                className={`${style.blockInfo} ${
                    task.isAbbButtonClicked && style.activeDropdown
                }`}
            >
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
                            {task.isAbbButtonClicked && (
                                <KanbanDropdownInput
                                    prevTask={prevTask}
                                    addNewTasksIssue={addNewTasksIssue}
                                    tasksId={task.id}
                                />
                            )}
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
        </div>
    );
};

export default KanbanBlock;
