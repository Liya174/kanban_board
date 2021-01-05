import style from "./KanbanBlock.module.css";
import arrowDropDown from "../../../img/arrow-drop-down.svg";
import { useState } from "react";

const KanbanDropdownInput = ({
    newIssueValue,
    prevTask,
    tasksId,
    replaceTasksIssue,
}) => {
    const [isListOpened, setIsListOpened] = useState(false); // changed when first line is clicked

    //dropdown made with <ul> & <li> tags
    return (
        <>
            <div className={style.item}>
                <div
                    className={style.dropdownFirstLine}
                    onClick={() => setIsListOpened(!isListOpened)}
                >
                    <span className={style.placeholder}>Choose issue</span>
                    <img src={arrowDropDown} alt="v" />
                </div>
            </div>
            {isListOpened && (
                <div className={`${style.dropdownListStart}`}>
                    <ul className={style.dropdownList}>
                        {prevTask.issues.map((issue) => (
                            <li
                                key={issue.id}
                                className={`${style.dropdownItem} ${
                                    newIssueValue === issue.title
                                        ? style.activeIssue
                                        : ""
                                }`}
                                onClick={() => {
                                    replaceTasksIssue(issue.title, tasksId);
                                    setIsListOpened(!isListOpened);
                                }}
                            >
                                {issue.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default KanbanDropdownInput;
