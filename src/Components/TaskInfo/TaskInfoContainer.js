import { connect } from "react-redux";
import { changeIssueBody, deleteIssue } from "../../redux/tasks-reducer";
import TaskInfo from "./TaskInfo";

const mapStateToProps = (state) => ({
    allTasks: state.tasks.allTasks,
});

const TaskInfoContainer = connect(mapStateToProps, {
    changeIssueBody,
    deleteIssue,
})(TaskInfo);

export default TaskInfoContainer;
