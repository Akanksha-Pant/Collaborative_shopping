import '../login/login.css';
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import axios from "axios";

function Signup() {

  const submitForm = (values) => {
    console.log(values);
    axios({
      method: "POST",
      data: {
        username: values.username,
        password: values.password
      },
      withCredentials: true,
      url: "http://localhost:5000/register"
    }).then((res) =>  {
      axios({
        method: "POST",
        data: {
          username: values.username,
          password: values.password
        },
        withCredentials: true,
        url: "http://localhost:5000/login"
      }).then((res) =>  window.location.href = "/profile")
      .catch((err) => console.log(err));
    })
  }
  const submitFormFailed = (error) => {
    console.error(error);
  }
    return (
      <div className="main">
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
             <Button style={{ background: "#c264ff", borderColor: "purple" }} type="primary" htmlType="submit">Signup</Button>
           </Form.Item>
          </Form>
          <Button style={{ color: "mauve"}}  type="link" htmlType="button">
          <Link to="/login">
            Have an account already?
          </Link>

          </Button>
      </div>
      </div>
    );
  }

export default Signup;
