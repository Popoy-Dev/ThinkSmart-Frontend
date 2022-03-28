import { all, fork } from 'redux-saga/effects'

import task from '../users/task-saga'

export default function* root() {
    yield all([
        fork(task)
    ])
}