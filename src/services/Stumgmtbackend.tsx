import * as Stumgmt from "stumgmtbackend";
import { AssignmentApi, AssignmentRegistrationApi, AuthenticationApi } from "stumgmtbackend";
import { env } from "../env"


export default class Stumgmtbackend {

    private config: Stumgmt.Configuration;
 


    constructor(access_token: string) {

        this.config = new Stumgmt.Configuration();
        this.config.basePath = env.REACT_APP_BACKEND;

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

    public async getGroup(assignmentid: string, userid: string) {
        let api = new AssignmentRegistrationApi(this.config);
        let reponse = await api.getRegisteredGroupOfUser("java-wise2021", assignmentid, userid);
        return reponse.data;
    }












}