import React from "react";
import * as Stumgmt from "stumgmtbackend";
import { AssignmentApi, CourseApi } from "stumgmtbackend";


export default class Stumgmtbackend {

    private config: Stumgmt.Configuration;
 


    constructor(access_token: string) {

        this.config = new Stumgmt.Configuration();
        this.config.basePath = process.env.REACT_APP_BACKEND;

        this.config.baseOptions= {  headers: { Authorization: "Bearer " + access_token } };

      

    }
    
    public async getAssigments() {
        let api = new AssignmentApi(this.config);
        let response = await api.getAssignmentsOfCourse("java-wise2021");

        response.data.forEach((assignment) => {

            console.log(assignment.name);


        });


    }













}