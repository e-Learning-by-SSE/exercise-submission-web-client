import React from "react";
import * as Stumgmt from "stumgmtbackend"
import * as Auth from "sparkyservice";
import { ErrorInterface } from "../interface/ErrorInterface";
import { CredentialsDto, AuthenticationInfoDto } from "sparkyservice";
import { convertCompilerOptionsFromJson } from "typescript";




export default class SparkyAuthentifikation {
    
    private config: Auth.Configuration;


    constructor() {

        this.config = SparkyAuthentifikation.getConfig();

        
        
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

    private static getConfig(): Auth.Configuration {
        let authConfig = new Auth.Configuration();
        authConfig.basePath= process.env.REACT_APP_AUTHURL;
        return authConfig;
    }

    public static async checkToken(token: string): Promise<boolean> {
        let auth = new Auth.AuthControllerApi(SparkyAuthentifikation.getConfig());
        let response = await auth.checkTokenAuthenticationStatus();
        return true;
    }
}