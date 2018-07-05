import * as typeAction from "../utils/constants";

const initialState = {
    db: {},
    isActive: false,
    toolbarAction: null,
    location: {},
    editModel: null,
    filter: 0,
    pending: false
};

const reducer = (state = initialState, {type, payload}) => {
    if (type === typeAction.SET_PENDING) {
        return {
            ...state,
            pending: payload
        }
    }
    if (type === typeAction.DB_FETCH_SUCCESS) {
        return {
            ...state,
            db: {...state.db, ...payload},
            pending: false
        }
    }
    if (type === typeAction.DB_FETCH) {
        return {
            ...state,
            pending: true
        }
    }
    if (type === typeAction.EDIT_TOOLBAR_STATE) {
        const name = payload.name ? payload.name : null;
        const active = payload.flag ? true : !name;
        return {
            ...state, isActive: active, toolbarAction: name
        }
    }
     if (type === typeAction.SET_DEFAULT_EDIT_MODEL) {
        return {
            ...state,
            editModel: initialState.editModel,
            pending: false
        }
    }
    if (type === typeAction.GM_COORDINATES_FETCH_SUCCESS) {
        return {
            ...state,
            editModel: {...state.editModel, ...payload},
            pending: false
        }
    }
    if (type === typeAction.GM_COORDINATES_FETCH) {
        return {
            ...state,
            pending: true
        }
    }

    if (type === typeAction.CLEAR_CURRENT_EDIT_MODEL) {
        const emptyModel = Object.keys(state.editModel).reduce(function (previous, current) {
            previous[current] = state.editModel[current] = "";
            return previous;
        }, {});
        return {
            ...state,
            editModel: {...state.editModel, ...emptyModel},
            pending: false
        }
    }

    if (type === typeAction.DB_DELETE_ITEM_SUCCESS) {
        const newState = Object.assign({}, state, {
            db: Object.keys(state.db).reduce((result, key) => {
                if (key !== payload) {
                    result[key] = state.db[key];
                }
                return result;
            }, {})
        });
        return {
            ...state,
            ...newState,
            pending: false
        }
    }
    if (type === typeAction.DB_ADD_NEW_ENTRY_SUCCESS) {
        const newItem = {...state.db, [payload.id]: payload.data};

        return {
            ...state,
            db: newItem,
            pending: false
        }
    }
    if (type === typeAction.DB_EDIT_ITEM_SUCCESS) {
        return {
            ...state,
            db: {...state.db, [payload.id]: payload.edited},
            pending: false
        }
    }
    if (type === typeAction.SET_FILTER_STATE) {
        return {
            ...state, filter: payload
        }
    }


    return state;
};

export default reducer;