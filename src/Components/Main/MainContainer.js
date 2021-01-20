import { connect } from "react-redux";
import {
    openInput,
    replaceTasksIssue,
    addNewTasksIssue,
} from "../../redux/tasks-reducer";
import Main from "./Main";

const mapStateToProps = (state) => ({
    allTasks: state.tasks.allTasks,
});

const MainContainer = connect(mapStateToProps, {
    openInput,
    replaceTasksIssue,
    addNewTasksIssue,
})(Main);

export default MainContainer;
