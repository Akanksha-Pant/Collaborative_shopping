import { BellOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from "antd";

function Notification() {
    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item>sgh</Menu.Item>
                <Menu.Item>sgh</Menu.Item>
                <Menu.Item>sgh</Menu.Item>
            </Menu>
          }>
            <Button icon={<BellOutlined />} />
        </Dropdown>
    )
}

export default Notification;
