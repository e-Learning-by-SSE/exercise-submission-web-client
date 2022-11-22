import React from "react";
import SparkyAuthentifikation from "./SparkyAuthentifikation";
import Stumgmtbackend from "./Stumgmtbackend";
import { UserDto } from "stumgmtbackend";
import { SubmissionClient } from "./SubmissionClient";
import { ErrorInterface } from "../interface/ErrorInterface";


export default class DataService {

    private accesstoken:string | null;
    private user: UserDto | null = null;

    constructor() {
        this.accesstoken = localStorage.getItem("token");
        if(this.checkToken()) {
            this.getCurrentUser().then((user) => {
                this.user = user;
            });
        }

    }

    private checkToken(): boolean {
        if (this.accesstoken != null) {
            
        }
        return false;
    }

    public getStumgmtbackend(): Stumgmtbackend {
        if (this.accesstoken == null) {
            throw new Error("No access token");
        }
        return new Stumgmtbackend(this.accesstoken);
    }

    public getSubmissisonClient(): SubmissionClient {
        if (this.accesstoken == null) {
            throw new Error("No access token");
        }
        return new SubmissionClient(this.accesstoken);
    }

    private async getCurrentUser(): Promise<UserDto> {
        let client = this.getStumgmtbackend();
        let response = await client.getCurrentUser();
        return response;
    }

}