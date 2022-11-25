import Api, { VersionDto, Configuration, SubmissionApi} from "exerciseserverclientlib"





export class SubmissionClient {

    private config: Configuration = new Configuration();


    constructor(accesstoken: string) {
        
        this.config.basePath = process.env.REACT_APP_SUBMISSIONSERVER;

        this.config.baseOptions = { headers: { Authorization: "Bearer " + accesstoken } };
    }
/*
    public async submitAssignment(assignmentId: string, groupName: string ,paths: string[]) {
        let api = new Api.SubmissionApi(this.config);
        let courseID = process.env.REACT_APP_COURSEID || "java-wise2021";
        
        let files: Api.FileDto[] = await this.getFilesInFileDTO(paths);
        let response = api.submit(courseID, assignmentId, groupName, files);

    
        console.log(response);
    }
    */
    
    public async getVersionsOfAssignment(assignmentId: string, group: string): Promise<Api.VersionDto[]> {
        let api = new SubmissionApi(this.config);
        let versionsResponse = await api.listVersions(process.env.REACT_APP_COURSEID || "java-wise2021", assignmentId, group);
        let versions = versionsResponse.data;
        return versions;
    }

    public async downloadSubmission(assignmentId: string, group: string, versiontimestamp: number): Promise<Api.FileDto[]> {
        let api = new SubmissionApi(this.config);
        let fileResponse = await api.getVersion(process.env.REACT_APP_COURSEID || "java-wise2021", assignmentId, group, versiontimestamp);
        let files = fileResponse.data;
        return files;
    }

    /*
    private async getFilesInFileDTO(paths: string[]): Promise<Api.FileDto[]> {
        //get over all files recursibve in a folder
        let files: FileDto[] = [];
        for (const path of paths) {
            let fileDto: FileDto = {
                path: path,
                content: await this.readFile(path)
            }
            files.push(fileDto);  
        }


        return files;
    }

     import content of file in BASE64 
    private async readFile(path: string): Promise<string> {
        let content = await fs.readFileSync(path, { encoding: "base64" });
        return content;
    }
    */
    



};

