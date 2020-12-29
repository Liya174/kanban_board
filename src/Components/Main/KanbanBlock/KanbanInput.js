import style from "./KanbanBlock.module.css";
import arrowDropDown from "../../../img/arrow-drop-down.svg";
import { useState } from "react";

const KanbanInput = (props) => {
    const { newIssueValue, prevTask, setNewIssueValue } = props;

    const [isListOpened, setIsListOpened] = useState(false); // changed when first line is clicked

    //if not first column - make dropdown, if first(backlog) - input
    //dropdown made with <ul> & <li> tags
    return prevTask ? (
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
                                    setNewIssueValue(issue.title);
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
    ) : (
        <>
            <div className={style.item}>
                <input type="text" className={style.input} />
            </div>
            <button className={style.submit}>Submit</button>
        </>
    );
};

export default KanbanInput;

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
