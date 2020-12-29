import React, { useState } from "react";

import style from "./KanbanBlock.module.css";
import KanbanInput from "./KanbanInput";
import KanbanButtons from "./KanbanButtons";

const KanbanBlock = ({
    tasksId,
    blockTitle,
    prevTask,
    openInput,
    isAbbButtonClicked,
    newIssueValue,
    setNewIssueValue,
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

                    {isAbbButtonClicked && (
                        <KanbanInput
                            prevTask={prevTask}
                            newIssueValue={newIssueValue}
                            setNewIssueValue={setNewIssueValue}
                        />
                    )}

                    <KanbanButtons
                        isAbbButtonClicked={isAbbButtonClicked}
                        prevTask={prevTask}
                        openInput={openInput}
                        tasksId={tasksId}
                    />
                </div>
            </div>
        </div>
    );
};

export default KanbanBlock;
