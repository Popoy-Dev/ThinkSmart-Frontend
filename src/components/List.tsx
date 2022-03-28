import React from "react";
import { Card, Col, Popconfirm, Button } from "antd";

const List = ({
  itemLists,
  searchTaskName,
  handleDeleteTask,
  handleUpdateTask,
}: any) => {
  const filteredData = itemLists?.data?.filter((item: any) => {
    if (Object.keys(searchTaskName).length === 0) {
      return item;
    } else {
      return item.taskname.toLowerCase().includes(searchTaskName);
    }
  });

  return (
    <>
      {filteredData?.map((list: any) => (
        <Col span={8} key={list.id} className="mt-12 pb-8">
          <Card
            title="Card title"
            bordered={true}
            extra={
              <>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => handleDeleteTask(list.id)}
                  okText="Yes"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>

                <Button type="default" onClick={() => handleUpdateTask(list)}>
                  Update
                </Button>
              </>
            }
            style={{ width: 400 }}
          >
            {list.taskname}
          </Card>
        </Col>
      ))}
    </>
  );
};

export default List;
