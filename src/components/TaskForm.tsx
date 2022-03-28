import React, { useEffect } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import { useDispatch } from "react-redux";
import taskSlice from "../shared/slices/task-slice";

const AddTaskForm = ({ onCancel, editTask, taskForm }: any) => {
  const dispatch = useDispatch();
  const { addTaskname, editTaskname } = taskSlice.actions;

  const onSaveTask = (values: string) => {
    dispatch(addTaskname(values));
  };
  const onEditTask = (values: any) => {
    const info = {
      id: editTask.id,
      taskname: values.taskname,
    };
    dispatch(editTaskname(info));
  };

  useEffect(() => {
    taskForm.setFieldsValue({ ...editTask });
  }, [editTask]);
  return (
    <Form
      form={taskForm}
      name="task"
      wrapperCol={{ span: 16 }}
      initialValues={{ taskname: editTask.taskname }}
      onFinish={editTask?.id ? onEditTask : onSaveTask}
      autoComplete="off"
    >
      <Form.Item
        label="Taskname"
        name="taskname"
        rules={[{ required: true, message: "Please input Taskname!" }]}
      >
        <Input />
      </Form.Item>

      <Row justify="space-between">
        <Col>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            {editTask?.id ? "Edit Task" : "Add new task"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTaskForm;
