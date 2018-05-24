import {takeEvery, takeLatest} from "redux-saga/effects";
import * as actionTypes from "../../utils/constants";
import {
    fetchDatabaseSaga,
    setNewEntrySaga,
    deleteEntrySaga,
    deleteCategorySaga,
    editEntrySaga,
    fetchCoordinates
} from "../saga/sagas";

export function* watchSaga() {
    yield takeEvery(actionTypes.DB_FETCH, fetchDatabaseSaga);
    yield takeEvery(actionTypes.DB_ADD_NEW_ENTRY, setNewEntrySaga);
    yield takeEvery(actionTypes.DB_DELETE_ITEM, deleteEntrySaga);
    yield takeEvery(actionTypes.DB_DELETE_CATEGORY, deleteCategorySaga);
    yield takeEvery(actionTypes.DB_EDIT_ITEM, editEntrySaga);
    yield takeLatest(actionTypes.GM_COORDINATES_FETCH, fetchCoordinates);
}