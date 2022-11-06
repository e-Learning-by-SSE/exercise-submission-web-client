import { RecordWithTtl } from "dns";
import React, { Component, PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonProps, Form, Message} from "semantic-ui-react";
import Layout from "./Layout";
import SparkyAuthentifikation from "../../services/SparkyAuthentifikation";
import Stumgmtbackend from "../../services/Stumgmtbackend";
import { redirect } from "react-router-dom";
import { ErrorInterface } from "../../interface/ErrorInterface";
import { AuthenticationInfoDto } from "sparkyservice";

export default class Login extends React.Component<React.PropsWithChildren<{}>> {


  
  buttonPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
    event.preventDefault();
    let username = document.getElementsByClassName("auth-input-field")[0].getElementsByTagName("input")[0].value;
    let password = document.getElementsByClassName("auth-input-field")[1].getElementsByTagName("input")[0].value;

    let auth = new SparkyAuthentifikation();
    let response = auth.authenticate(username, password).then((response) => {
      if(response.status) {
        if(response.data) {
          if(response.data.token) {
            if(response.data.token.token) {
              // let backend = new Stumgmtbackend(response.data.token.token);
              // backend.getAssigments();
              localStorage.setItem("token", response.data.token.token);
              const navigate = useNavigate();
              navigate("/dashboard");
              
              
            }
          }
    
        }
        
      } else {
        console.log("Error Can't Authentificate" + response.message);
      }
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