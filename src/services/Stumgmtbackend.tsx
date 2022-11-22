import React from "react";
import * as Stumgmt from "stumgmtbackend";
import { AssignmentApi, AssignmentDto, AuthenticationApi, CourseApi } from "stumgmtbackend";


export default class Stumgmtbackend {

    private config: Stumgmt.Configuration;
 


    constructor(access_token: string) {

        this.config = new Stumgmt.Configuration();
        this.config.basePath = process.env.REACT_APP_BACKEND;

        this.config.baseOptions= {  headers: { Authorization: "Bearer " + access_token } };

      

    }
    
    public async getAssigments(): Promise<Stumgmt.AssignmentDto[]> {
        let api = new AssignmentApi(this.config);
        let response = await api.getAssignmentsOfCourse("java-wise2021");
        return response.data
    }

    public async getCurrentUser(): Promise<Stumgmt.UserDto> {
        let api = new AuthenticationApi(this.config);
        let response = await api.whoAmI();
        return response.data;
    }













}