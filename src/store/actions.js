import * as actionType from "../utils/constants";

export const fetchDB = () => {
    return {
        type: actionType.DB_FETCH
    }
};

export function setDatabaseToStore(dataArray) {
    return {
        type: actionType.DB_FETCH_SUCCESS,
        payload: dataArray
    }
}

export function addDBEntry(data) {
    return {
        type: actionType.DB_ADD_NEW_ENTRY,
        payload: data
    }
}

export function addNewEntryToStore(data) {
    return {
        type: actionType.DB_ADD_NEW_ENTRY_SUCCESS,
        payload: data
    }
}

export function setToolBarActive(dispatch) {
    dispatch({
        type: actionType.EDIT_TOOLBAR_STATE,
        payload: {flag: true}
    });
}

export function deleteDataFromStore(id) {
    return {
        type: actionType.DB_DELETE_ITEM_SUCCESS,
        payload: id
    }
}

export function deleteDBItem(id) {
    return {
        type: actionType.DB_DELETE_ITEM,
        payload: id
    }
}

export function deleteDBCategory(forDelete) {
    return {
        type: actionType.DB_DELETE_CATEGORY,
        payload: forDelete
    }
}

export function editEntryInStore(data) {
    return {
        type: actionType.DB_EDIT_ITEM_SUCCESS,
        payload: data
    }

}

export function editDBItem(data) {
    return {
        type: actionType.DB_EDIT_ITEM,
        payload: data
    }
}

export function onDefaultCurrentEditModel(data) {
    return dispatch => dispatch(
        {
            type: actionType.SET_DEFAULT_EDIT_MODEL,
            payload: data
        }
    )
}

export function onCleanCurrentEditModel() {
    return dispatch => dispatch(
        {
            type: actionType.CLEAR_CURRENT_EDIT_MODEL
        }
    )
}

export function onSetCurrentEditModel(data) {
    return dispatch => dispatch(
        {
            type: actionType.GM_COORDINATES_FETCH_SUCCESS,
            payload: data
        }
    )
}

export function getCoordinates(model) {
        return {
            type: actionType.GM_COORDINATES_FETCH,
            payload: model
        }
 }

export function onToolbarHandler(data) {
    return dispatch => dispatch(
        {
            type: actionType.EDIT_TOOLBAR_STATE,
            payload: data
        }
    )
}

export function setFilterState(data) {
    return dispatch => dispatch(
        {
            type: actionType.SET_FILTER_STATE,
            payload: data
        }
    )
}



