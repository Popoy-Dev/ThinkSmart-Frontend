import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import AddTaskForm from "./TaskForm";

const AddTaskModal = ({
  isModalVisible,
  setIsModalVisible,
  editTask,
  setEditTask,
  taskForm,
}: any) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    taskForm.resetFields();
  }, [isModalVisible]);
  const handleCancel = () => {
    setEditTask({});
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={editTask?.id ? "Edit Task" : "Add Task"}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <AddTaskForm
        onCancel={handleCancel}
        editTask={editTask}
        taskForm={taskForm}
      />
    </Modal>
  );
};

export default AddTaskModal;
