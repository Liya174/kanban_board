import style from "./KanbanBlock.module.css";
import addCard from "../../../img/add-card.svg";

const KanbanButtons = (props) => {
    const { isAbbButtonClicked, openInput, tasksId, prevTask } = props;

    const isPrevTaskFull =
        prevTask && prevTask.issues.length > 0 ? true : false;

    return (
        !isAbbButtonClicked && (
            <button
                className={`${style.addButton} ${
                    isPrevTaskFull && style.active
                }`}
                disabled={!isPrevTaskFull}
                onClick={() => openInput(tasksId)}
            >
                <img src={addCard} alt="+" className={style.addImage} />
                Add card
            </button>
        )
    );
};

export default KanbanButtons;
