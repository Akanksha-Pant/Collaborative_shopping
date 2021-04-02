import './login.css';
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import axios from "axios";

function Login() {

  const submitForm = (values) => {
    console.log(values);
    axios({
      method: "POST",
      data: {
        username: values.username,
        password: values.password
      },
      withCredentials: true,
      url: "http://localhost:5000/login"
    }).then((res) => console.log(res));
  }
  const submitFormFailed = (error) => {
    console.error(error);
  }
    return (
      <div className="Login">
        <Form
          name="basic"
          onFinish={submitForm}
          onFinishFailed={submitFormFailed}>
           <Form.Item
             label="Username"
             name="username"
             rules={[
               { required:true, message: "Please input username!" }
             ]}>
            <Input placeholder="username or email" prefix={<UserOutlined />} />
           </Form.Item>
           <Form.Item
             label="Password"
             name="password"
             rules={[
              { required:true, message: "Please input password!" }
            ]}>
            <Input.Password
              placeholder="password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
           </Form.Item>
           <Form.Item>
             <Button style={{ background: "#c264ff", borderColor: "purple" }} type="primary" htmlType="submit">Login</Button>
           </Form.Item>
          </Form>
          <Button style={{ color: "mauve"}}  type="link" htmlType="button">
              Create new account
          </Button>
      </div>
    );
  }

export default Login;
