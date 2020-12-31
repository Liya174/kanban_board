import React, { useState } from "react";

import style from "./KanbanBlock.module.css";
import KanbanButtons from "./KanbanButtons";
import BacklogBlockInputAndButton from "./BacklogBlockInputAndButton";
import KanbanDropdownInput from "./KanbanInput";

const KanbanBlock = ({
    tasksId,
    blockTitle,
    prevTask,
    openInput,
    isAbbButtonClicked,
    addNewTasksIssue,
    ...props
}) => {
    //structure: issues-list, input for adding issue, add-button
    return (
        <div
            className={`${style.block} ${tasksId === 3 ? style.blockLast : ""}`}
        >
            <p>{blockTitle}</p>
            <div
                className={`${style.blockInfo} ${
                    isAbbButtonClicked && style.activeDropdown
                }`}
            >
                <div className={style.blockInfoWithoutScroll}>
                    {React.Children.toArray(props.children)}

                    {blockTitle === "Backlog" ? (
                        <BacklogBlockInputAndButton
                            addNewTasksIssue={addNewTasksIssue}
                            isAbbButtonClicked={isAbbButtonClicked}
                            openInput={openInput}
                            tasksId={tasksId}
                        />
                    ) : (
                        <>
                            {isAbbButtonClicked && (
                                <KanbanDropdownInput
                                    prevTask={prevTask}
                                    addNewTasksIssue={addNewTasksIssue}
                                    tasksId={tasksId}
                                />
                            )}
                            <KanbanButtons
                                isAbbButtonClicked={isAbbButtonClicked}
                                prevTask={prevTask}
                                openInput={openInput}
                                tasksId={tasksId}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KanbanBlock;
