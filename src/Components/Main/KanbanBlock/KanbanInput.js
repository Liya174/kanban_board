import style from "./KanbanBlock.module.css";
import arrowDropDown from "../../../img/arrow-drop-down.svg";
import { useState } from "react";

const KanbanDropdownInput = (props) => {
    const { newIssueValue, prevTask, addNewTasksIssue, tasksId } = props;

    const [isListOpened, setIsListOpened] = useState(false); // changed when first line is clicked

    //dropdown made with <ul> & <li> tags
    return (
        <>
            <div className={style.item}>
                <div
                    className={style.dropdownFirstLine}
                    onClick={() => setIsListOpened(!isListOpened)}
                >
                    <span>{newIssueValue}</span>
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
                                    addNewTasksIssue(issue.title, tasksId);
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

/* //with datalist realisation
    <div className={`${style.item} ${style.datalist}`}>
            <input
            list="issues"
            id="newIssues"
            name="new issues"
            className={style.firstDatalistString}
        />
        <datalist id="issues" className={style.dropdownList}>
            {prevTask.issues.map((issue) => (
                <option
                    className={style.dropdownItem}
                    key={issue.id}
                    value={issue.title}
                ></option>
            ))}
        </datalist> 
        
    </div>*/
