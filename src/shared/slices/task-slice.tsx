import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../../app/store'

// create file for status
import {
  resetActionStatus,
  initActionStatus,
  successActionStatus,
  failedActionStatus,
} from "../constant/status-constant";
// Define a type for the slice state
interface TaskState {
  data: [];
}

// Define the initial state using that type
const initialState: TaskState = {
  data: [],
};

export const taskSlice = createSlice({
  name: "task",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getTaskData: (state) => ({
      ...state,
      status: {
        initActionStatus,
      },
      type: "taskData",
    }),
    getTaskDataSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      data: payload,
      status: {
        successActionStatus,
      },
      type: "taskData",
    }),
    // Use the PayloadAction type to declare the contents of `action.payload`
    getTaskDataFailed: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      data: payload,
      status: {
        failedActionStatus,
      },
      type: "taskData",
    }),
    addTaskname: (state: any, payload: any) => ({
      ...state,
      status: {
        ...initActionStatus,
        type: "addTaskname",
      },
    }),
    addTasknameSuccess: (state: any, { payload }: any) => ({
      ...state,
      addedTask: payload,
      status: {
        ...successActionStatus,
        type: "addTaskname",
      },
    }),
    addTasknameFailed: (state: any, { payload }: any) => ({
      ...state,
      status: {
        ...failedActionStatus,
        message: payload,
        type: "addTaskname",
      },
    }),
    editTaskname: (state: any, payload: any) => ({
      ...state,
      status: {
        ...initActionStatus,
        type: "editTaskname",
      },
    }),
    editTasknameSuccess: (state: any, { payload }: any) => ({
      ...state,
      editedTask: payload,
      status: {
        ...successActionStatus,
        type: "editTaskname",
      },
    }),
    editTasknameFailed: (state: any, { payload }: any) => ({
      ...state,
      status: {
        ...failedActionStatus,
        message: payload,
        type: "editTaskname",
      },
    }),
    deleteTask: (state: any, payload: any) => ({
      ...state,
      status: {
        ...initActionStatus,
        type: "deleteTask",
      },
    }),
    deleteTaskSuccess: (state: any) => ({
      ...state,
      status: {
        ...successActionStatus,
        type: "deleteTask",
      },
    }),
    deleteTaskFailed: (state: any, { payload }: any) => ({
      ...state,
      status: {
        ...failedActionStatus,
        message: payload,
        type: "deleteTask",
      },
    }),
  },
});

// can access this part inside components using by importing
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default taskSlice;
