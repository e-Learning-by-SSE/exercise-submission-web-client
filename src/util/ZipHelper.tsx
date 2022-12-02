import JSZip from "jszip";
import { FileDto } from "exerciseserverclientlib";


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

    public static async getZipFile(files: FileDto[]): Promise<JSZip> {
        let zip = new JSZip();
        for(let file of files) {
            zip.file(file.path, file.content);
        }
        return zip;
    }











}