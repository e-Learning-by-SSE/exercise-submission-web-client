import React from "react";
import Api from "exerciseserverclientlib"
import { FileDto } from "exerciseserverclientlib";
import fs from "fs";
import path from "path";
import walk from "../util/FileWalker";



export class SubmissionClient {

    private config: Api.Configuration;


    constructor(accesstoken: string) {
        
        this.config = new Api.Configuration();
        this.config.basePath = process.env.REACT_APP_SUBMISSIONSERVER;

        this.config.baseOptions = { headers: { Authorization: "Bearer " + accesstoken } };
    }

    public async submitAssignment(assignmentId: string, groupName: string ,path: string) {
        let api = new Api.SubmissionApi(this.config);
        let courseID = process.env.REACT_APP_COURSEID || "java-wise2021";
        
        let files: Api.FileDto[] = await this.getFilesInFileDTO(path);
        let response = api.submit(courseID, assignmentId, groupName, files);

    
        console.log(response);
    }

    
   

    private async getFilesInFileDTO(dirPath: string): Promise<Api.FileDto[]> {
        //get over all files recursibve in a folder
        let files: FileDto[] = [];
        for (const path of walk(dirPath)) {
            let fileDto: FileDto = {
                path: path,
                content: await this.readFile(path)
            }
            files.push(fileDto);  
        }


        return files;
    }

    /* import content of file in BASE64 */
    private async readFile(path: string): Promise<string> {
        let content = await fs.readFileSync(path, { encoding: "base64" });
        return content;
    }




};

