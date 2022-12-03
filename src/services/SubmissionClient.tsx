import Api, { Configuration, SubmissionApi, FileDto, SubmissionResultDto} from "exerciseserverclientlib"
import JSZip from "jszip";





export class SubmissionClient {

    private config: Configuration = new Configuration();


    constructor(accesstoken: string) {
        
        this.config.basePath = process.env.REACT_APP_SUBMISSIONSERVER;

        this.config.baseOptions = { headers: { Authorization: "Bearer " + accesstoken } };
    }

    public async submitAssignment(assignmentId: string, groupName: string ,files: FileList | JSZip.JSZipObject[]): Promise<Api.SubmissionResultDto>{
        let api = new SubmissionApi(this.config);
        let courseID = process.env.REACT_APP_COURSEID || "java-wise2021";
        let fileDtos = await SubmissionClient.convertFileListoFileDtoList(files);
        let response = await api.submit(courseID, assignmentId, groupName, fileDtos);
        return response.data;
    }
    
    
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

   private static async convertFileListoFileDtoList(fileList: FileList| JSZip.JSZipObject[]): Promise<Api.FileDto[]> {

        let files: FileDto[] = [];
        for (let i = 0; i < fileList.length; i++) {
            let file = fileList[i];
            let fileDto: FileDto;
            if(file instanceof File) {
                fileDto = { path: file.name, content: await SubmissionClient.fileToBase64(file)};
            } else {
                fileDto = { path: file.name, content: await file.async("base64") };
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


};

