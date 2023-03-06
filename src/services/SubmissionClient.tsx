import Api, { Configuration, SubmissionApi, FileDto} from "exerciseserverclientlib"
import JSZip from "jszip";
import { env } from "../env"





export class SubmissionClient {

    private config: Configuration = new Configuration();
    private courseid: string;

    constructor(accesstoken: string, courseid: string) {
        
        this.config.basePath = env.REACT_APP_SUBMISSIONSERVER;
        this.courseid = courseid;

        this.config.baseOptions = { headers: { Authorization: "Bearer " + accesstoken } };
    }
    
    public async submitAssignment(assignmentId: string, groupName: string ,files: FileList | JSZip.JSZipObject[]): Promise<Api.SubmissionResultDto>{
        let api = new SubmissionApi(this.config);
        let courseID = env.REACT_APP_COURSEID ||  this.courseid;
        let fileDtos = await SubmissionClient.convertFileListoFileDtoList(files);
        let response = await api.submit(courseID, assignmentId, groupName, fileDtos);
        return response.data;
    }
    
    
    public async getVersionsOfAssignment(assignmentId: string, group: string): Promise<Api.VersionDto[]> {
        let api = new SubmissionApi(this.config);
        let versionsResponse = await api.listVersions(env.REACT_APP_COURSEID ||  this.courseid, assignmentId, group);
        let versions = versionsResponse.data;
        return versions;
    }

    public async downloadSubmission(assignmentId: string, group: string, versiontimestamp: number): Promise<Api.FileDto[]> {
        let api = new SubmissionApi(this.config);
        let fileResponse = await api.getVersion(env.REACT_APP_COURSEID ||  this.courseid, assignmentId, group, versiontimestamp);
        let files = fileResponse.data;
        return files;
    }

   private static async convertFileListoFileDtoList(fileList: FileList| JSZip.JSZipObject[]): Promise<Api.FileDto[]> {

        let files: FileDto[] = [];
        for (let i = 0; i < fileList.length; i++) {
            let file = fileList[i];
            let fileDto: FileDto;
        
            if(file instanceof File) {
                fileDto = { path: file.name, content: SubmissionClient.removeDataUrlPrefix(await SubmissionClient.fileToBase64(file))};
            } else {
                fileDto = { path: file.name, content: SubmissionClient.removeDataUrlPrefix(await file.async("base64")) };
            }
            if(fileDto.content === undefined) {
                fileDto.content = "";
            }
            files.push(fileDto);

        }
        return files;
    }
   
    private static fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    private static removeDataUrlPrefix(url: string): string {
        return url.split("base64,")[1];
    }


};

