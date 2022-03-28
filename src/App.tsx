import React, { useState, useEffect } from "react";
import List from "./components/List";
import AddTaskModal from "./components/TaskModal";
import { useSelector, useDispatch } from "react-redux";
import taskSlice from "./shared/slices/task-slice";
import { Row, Input, Button, message as AntDMessage, Form, Spin } from "antd";

const App = () => {
  const dispatch = useDispatch();
  const { getTaskData, deleteTask } = taskSlice.actions;
  const { data } = useSelector((state: any) => state?.task);
  const { status: taskStatus } = useSelector((state: any) => state?.task);
  const [taskForm] = Form.useForm();
  const [itemLists, setItemLists] = useState<any>([]);
  const [searchTaskName, setSearchTaskName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTask, setEditTask] = useState({});

  const inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTaskName(lowerCase);
  };

  useEffect(() => {
    dispatch(getTaskData());
  }, []);

  useEffect(() => {
    if (data) {
      setItemLists(data);
    }
  }, [data]);

  const showModal = () => {
    setIsModalVisible(true);
    taskForm.resetFields();
  };

  const handleDeleteTask = (record: any) => {
    dispatch(deleteTask(record));
  };

  const handleUpdateTask = (list: any) => {
    setIsModalVisible(true);
    setEditTask(list);
  };

  const onStatusChange = () => {
    if (taskStatus?.submitted && !taskStatus?.loading) {
      switch (taskStatus?.type) {
        case "addTaskname":
          if (taskStatus?.success) {
            dispatch(getTaskData());
            setIsModalVisible(false);
            AntDMessage.success("Successfully add the new task");
            taskForm.resetFields();
          } else {
            AntDMessage.error("Something wrong while adding new task");
          }
          break;
        case "editTaskname":
          if (taskStatus?.success) {
            dispatch(getTaskData());
            setIsModalVisible(false);
            AntDMessage.success("Successfully edit the task");
            taskForm.resetFields();
            setEditTask({});
          } else {
            AntDMessage.error("Something wrong while adding new task");
          }
          break;

        case "deleteTask":
          if (taskStatus?.success) {
            dispatch(getTaskData());
            AntDMessage.success("Successfully delete the task");
          } else {
            AntDMessage.error("Something wrong while deleting a task");
          }
      }
    }
  };

  useEffect(() => {
    onStatusChange();
  }, [taskStatus]);
  return (
    <>
      <div className="site-card-wrapper px-44 py-44 bg-red bg-indigo-100	">
        <div className="flex justify-between">
          <Input
            placeholder="Search task name"
            onChange={inputHandler}
            className="mr-12"
            style={{ width: "20%" }}
          />

          <Button type="primary" onClick={showModal}>
            Add Task
          </Button>
          <AddTaskModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            editTask={editTask}
            setEditTask={setEditTask}
            taskForm={taskForm}
          />
        </div>
        {itemLists?.data?.length ? (
          <Row gutter={16}>
            <List
              itemLists={itemLists}
              searchTaskName={searchTaskName}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          </Row>
        ) : (
          <div className="text-center">
            <Spin spinning={taskStatus?.loading} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
