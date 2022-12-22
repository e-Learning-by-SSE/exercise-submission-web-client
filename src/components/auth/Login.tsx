import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps, Form} from "semantic-ui-react";
import Layout from "./Layout";


export default class Login extends React.Component<React.PropsWithChildren<{}>> {


  
  buttonPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
    event.preventDefault();
    let username = document.getElementsByClassName("auth-input-field")[0].getElementsByTagName("input")[0].value;
    let password = document.getElementsByClassName("auth-input-field")[1].getElementsByTagName("input")[0].value;

    


  
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