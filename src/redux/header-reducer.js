const TOGGLE_MENU = "header/TOGGLE_MENU";

export const initialState = {
    isMenuVisible: false,
};

export const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isMenuVisible: !state.isMenuVisible,
            };

        default:
            return state;
    }
};

export const toggleMenu = () => ({
    type: TOGGLE_MENU,
});
