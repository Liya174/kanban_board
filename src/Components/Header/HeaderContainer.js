import { connect } from "react-redux";
import { toggleMenu } from "../../redux/header-reducer";
import Header from "./Header";

const mapStateToProps = (state) => {
    return { isMenuVisible: state.header.isMenuVisible };
};

const HeaderContainer = connect(mapStateToProps, { toggleMenu })(Header);

export default HeaderContainer;
