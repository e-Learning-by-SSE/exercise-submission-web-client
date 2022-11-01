import { RecordWithTtl } from "dns";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonProps, Form, Message} from "semantic-ui-react";
import Layout from "./Layout";
import SparkyAuthentifikation from "../../services/SparkyAuthentifikation";

export default class Login extends Component {

  buttonPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
    let auth = new SparkyAuthentifikation();
    auth.authenticate("adam", "1234567").then((response) => {
      console.log(response);
    });
    

  }

  render() {
    return (
      <Layout header="Dashboard Log in">
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          className="auth-input-field"
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          className="auth-input-field"
        />

          <Button color="teal" fluid size="medium" className="auth-login-button" onClick={this.buttonPressed}>
            Login
          </Button>
      </Layout>
    );
  }

  


}