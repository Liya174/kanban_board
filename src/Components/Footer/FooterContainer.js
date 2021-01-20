import { connect } from "react-redux";
import Footer from "./Footer";

const mapStateToProps = (state) => {
    return {
        allTasks: state.tasks.activeTasks,
        activeTasks: state.tasks.activeTasks(),
        finishedTasks: state.tasks.finishedTasks(),
    };
};

const FooterContainer = connect(mapStateToProps, null)(Footer);

export default FooterContainer;
