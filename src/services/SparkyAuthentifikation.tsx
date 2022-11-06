import React from "react";
import * as Stumgmt from "stumgmtbackend"
import * as Auth from "sparkyservice";
import { ErrorInterface } from "../interface/ErrorInterface";
import { CredentialsDto, AuthenticationInfoDto } from "sparkyservice";
import { convertCompilerOptionsFromJson } from "typescript";




export default class SparkyAuthentifikation {
    
    private config: Auth.Configuration;


    constructor() {

        this.config = new Auth.Configuration();
        this.config.basePath= process.env.REACT_APP_AUTHURL;

        
        
    }
    
    public async authenticate(username:string, password:string): Promise<ErrorInterface<AuthenticationInfoDto>> {
        let auth = new Auth.AuthControllerApi(this.config);
        let credentials: CredentialsDto = {
            username: username,
            password: password
        };
        
        let returnInterface: ErrorInterface<AuthenticationInfoDto> = {
            message: "",
            code: 0,
            status: false,
            data: null
        };

        try {
            let response = await auth.authenticate(credentials);
            returnInterface.data = response.data;
            returnInterface.status = true;
        } catch(e) {
            console.log(e); // 401 false username or password
            returnInterface.status = false;
        }

        return returnInterface;
    }
}