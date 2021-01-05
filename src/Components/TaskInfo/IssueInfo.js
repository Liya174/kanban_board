import { useState } from "react";
import style from "./TaskInfo.module.css";

const IssueInfo = ({ issue, taskName, changeIssueBody, deleteIssue }) => {
    const { title, body, createTime } = issue;

    const [editMode, setEditMode] = useState(false);
    const [bodyValue, setBodyValue] = useState(body);
    return (
        <div className={style.issueContainer}>
            <h2 className={style.subtitle}>{title}</h2>
            <div className={style.createTime}>Created: {createTime}</div>

            {!editMode ? (
                <>
                    <div className={style.issueBody}>
                        {body || (
                            <span className={style.addText}>
                                Here is no information
                            </span>
                        )}
                    </div>
                    <button
                        className={style.button}
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </button>
                    <button
                        className={style.button}
                        onClick={() => deleteIssue(issue.id, taskName)}
                    >
                        Delete issue
                    </button>
                </>
            ) : (
                <>
                    <textarea
                        className={style.issueBodyEdit}
                        value={bodyValue}
                        rows="5"
                        onChange={(e) => setBodyValue(e.target.value)}
                    ></textarea>
                    <button
                        className={style.button}
                        onClick={() => {
                            changeIssueBody(bodyValue, issue.id, taskName);
                            setEditMode(false);
                        }}
                    >
                        Save
                    </button>
                </>
            )}
        </div>
    );
};

export default IssueInfo;
