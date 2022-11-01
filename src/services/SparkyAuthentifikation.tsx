import React from "react";
import * as Stumgmt from "stumgmtbackend"
import * as Auth from "sparkyservice";
import { CredentialsDto, AuthenticationInfoDto } from "sparkyservice";




export default class SparkyAuthentifikation {
    
    private config: Auth.Configuration;


    constructor() {

        this.config = new Auth.Configuration();
        this.config.basePath="http://localhost:65180";
        
        
    }
    
    public async authenticate(username:string, password:string): Promise<AuthenticationInfoDto> {
        let auth = new Auth.AuthControllerApi(this.config);
        let credentials: CredentialsDto = {
            username: username,
            password: password
        };
        
        
        let response;
        try {
            response = await auth.authenticate(credentials);
        } catch(e) {
            response = 
            console.log(e);
        }
        

        
        return response.data;
    }
}