import { useState } from "react";

import style from "./KanbanBlock.module.css";
import addCard from "../../../img/add-card.svg";

const BacklogBlockInputAndButton = ({
    addNewTasksIssue,
    isAbbButtonClicked,
    openInput,
    tasksId,
}) => {
    const [newBacklogValue, setNewBacklogValue] = useState("");

    return (
        <>
            {isAbbButtonClicked ? (
                <>
                    <div className={style.item}>
                        <input
                            type="text"
                            className={style.input}
                            value={newBacklogValue}
                            onChange={(e) => setNewBacklogValue(e.target.value)}
                            onBlur={() => {
                                if (newBacklogValue.trim()) {
                                    addNewTasksIssue(newBacklogValue, tasksId);
                                    setNewBacklogValue("");
                                }
                            }}
                        />
                    </div>
                    <button
                        className={style.submit}
                        onClick={() => {
                            if (newBacklogValue.trim()) {
                                addNewTasksIssue(newBacklogValue, tasksId);
                                setNewBacklogValue("");
                            }
                        }}
                    >
                        Submit
                    </button>
                </>
            ) : (
                <>
                    <button
                        className={`${style.addButton} ${style.active}`}
                        onClick={() => openInput(tasksId)}
                    >
                        <img src={addCard} alt="+" className={style.addImage} />
                        Add card
                    </button>
                </>
            )}
        </>
    );
};

export default BacklogBlockInputAndButton;
