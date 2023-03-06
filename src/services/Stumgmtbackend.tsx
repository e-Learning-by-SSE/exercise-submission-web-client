import * as Stumgmt from "stumgmtbackend";
import { AssignmentApi, AssignmentRegistrationApi, AuthenticationApi, CourseApi } from "stumgmtbackend";
import { env } from "../env"


export default class Stumgmtbackend {

    private config: Stumgmt.Configuration;
    private courseid: string;


    constructor(access_token: string, courseid: string) {

        this.config = new Stumgmt.Configuration();
        this.config.basePath = env.REACT_APP_BACKEND;
        this.courseid = courseid;

        this.config.baseOptions= {  headers: { Authorization: "Bearer " + access_token } };

      

    }
    
    public async getAssigments(): Promise<Stumgmt.AssignmentDto[]> {
        let api = new AssignmentApi(this.config);
        let response = await api.getAssignmentsOfCourse(this.courseid);
        return response.data
    }

    public async getCurrentUser(): Promise<Stumgmt.UserDto> {
        let api = new AuthenticationApi(this.config);
        let response = await api.whoAmI();
        return response.data;
    }

    public async getGroup(assignmentid: string, userid: string) {
        let api = new AssignmentRegistrationApi(this.config);
        let reponse = await api.getRegisteredGroupOfUser(this.courseid, assignmentid, userid);
        return reponse.data;
    }

    public async getCourses(): Promise<Stumgmt.CourseDto[]> {
        let api = new CourseApi(this.config);
        let response = await api.getCourses();
        return response.data;
    }







}