import Stumgmtbackend from "./Stumgmtbackend";
import { AssignmentDto, UserDto } from "stumgmtbackend";
import { SubmissionClient } from "./SubmissionClient";
import { User } from "oidc-client-ts";
import { env } from "../env"


export default class DataService {

    private oicdUser: User | null = null;
    private user: UserDto | null = null;

    constructor() {
        let userAsString = localStorage.getItem("oidc.user:" + env.REACT_APP_AUTHORITY + ":" + env.REACT_APP_CLIENTID);
        if(userAsString != null) {
            this.oicdUser = User.fromStorageString(userAsString);
        }
        if(this.checkToken()) {
            this.getCurrentUser().then((user) => {
                this.user = user;
            });
        }

    }

    private checkToken(): boolean {
        let valid = false;
        if (this.oicdUser != null && this.oicdUser.access_token != null && this.oicdUser.access_token.length > 0) {
            valid = true;
        }
        return valid;
    }

    public getStumgmtbackend(): Stumgmtbackend {
        if (this.oicdUser == null || this.oicdUser.access_token == null) {
            throw new Error("No access token");
        }
        return new Stumgmtbackend(this.oicdUser.access_token);
    }

    public getSubmissisonClient(): SubmissionClient {
        if (this.oicdUser == null || this.oicdUser.access_token == null) {
            throw new Error("No access token");
        }
        return new SubmissionClient(this.oicdUser.access_token);
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