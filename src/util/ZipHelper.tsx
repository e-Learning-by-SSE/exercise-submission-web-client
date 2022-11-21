import React from "react";
import JSZip from "jszip";


export class Zip {

    private file: File;

    constructor(file: File) {
        this.file = file;
    }

    public async getFiles(): Promise<JSZip.JSZipObject[]> {
        let zip = new JSZip();
      return await zip.loadAsync(this.file).then((zip) => {
            let files = [];
            for (let file in zip.files) {
                files.push(zip.files[file]);
            }
            return files;
        });

    }









}