import Stumgmtbackend from "./Stumgmtbackend";
import { AssignmentDto, UserDto } from "stumgmtbackend";
import { SubmissionClient } from "./SubmissionClient";
import CurrentCourse from "./courses/CurrentCourse";


export default class DataService {

    private accesstoken:string | null;
    private user: UserDto | null = null;

    private courseidstorage = new CurrentCourse();

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
        return true;
    }

    public getCurrentCourseId(): CurrentCourse {
        return this.courseidstorage;
    }



    public getStumgmtbackend(): Stumgmtbackend {
        if (this.accesstoken == null) {
            throw new Error("No access token");
        }
        return new Stumgmtbackend(this.accesstoken, this.courseidstorage.getCourseId());
    }

    public getSubmissisonClient(): SubmissionClient {
        if (this.accesstoken == null) {
            throw new Error("No access token");
        }
        return new SubmissionClient(this.accesstoken, this.courseidstorage.getCourseId());
    }

    private async getCurrentUser(): Promise<UserDto> {
        let client = this.getStumgmtbackend();
        let response = await client.getCurrentUser();
        return response;
    }

    public async getGroupName(assignment: AssignmentDto): Promise<string> {
        let user = await this.getCurrentUserDto();
        if(assignment.collaboration) {
            let stumgmt = this.getStumgmtbackend();
            let group = await stumgmt.getGroup(assignment.id, user.id);
            return group.name;
        } else {
            return user.username;
        }
    }

    public async getCurrentUserDto(): Promise<UserDto> {
        let user = this.user;
        if(user == null) {
            user = await this.getCurrentUser();
        }
        return user;
    }

}