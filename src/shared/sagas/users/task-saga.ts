import { call, put, all, takeLatest } from 'redux-saga/effects'
import taskSlice from '../../slices/task-slice'
import taskService from '../../services/task-service'

const {
    getTaskData,
    getTaskDataSuccess,
    getTaskDataFailed,
    addTaskname,
    addTasknameSuccess,
    addTasknameFailed,
    editTaskname,
    editTasknameSuccess,
    editTasknameFailed,
    deleteTask,
    deleteTaskSuccess,
    deleteTaskFailed
} = taskSlice.actions

function* getTask(action: any) {
    try {
        const { data } = yield call(taskService.getTask, action.payload);
        yield put(getTaskDataSuccess(data));
    } catch (e) {
        yield put(getTaskDataFailed(e));
    }
}

function* addTasknameSaga(action : any) {
    try {
      const { data } = yield call(taskService.addTaskname, action.payload)
      yield put(addTasknameSuccess(data))
    } catch (error) {
      yield put(addTasknameFailed(error))
    }
  }
  function* editTasknameSaga(action : any) {
    try {
      const { data } = yield call(taskService.editTaskname, action.payload)
      yield put(editTasknameSuccess(data))
    } catch (error) {
      yield put(editTasknameFailed(error))
    }
  }

  function* deleteTaskSaga(action : any) {
    try {
      yield call(taskService.deleteTask, action.payload)
      yield put(deleteTaskSuccess())
    } catch (error) {
      yield put(deleteTaskFailed(error))
    }
  }

export default function* root() {
    yield all([
        takeLatest(getTaskData, getTask),
        takeLatest(addTaskname, addTasknameSaga),
        takeLatest(editTaskname, editTasknameSaga),
        takeLatest(deleteTask, deleteTaskSaga)
    ])
}