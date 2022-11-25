import JSZip from "jszip";

export default class FileTreeElement {
    private file: JSZip.JSZipObject;
    private dir: boolean
    private content: FileTreeElement[] | null = null;

    constructor(file: JSZip.JSZipObject, dir: boolean) {
        this.file = file;
        this.dir = file.dir;
    }

    public getFile(): JSZip.JSZipObject {
        return this.file;
    }
    
    public isDir(): boolean {
        return this.dir;
    }

    public getContent(): FileTreeElement[] | null {
        return this.content;
    }

    public setContent(content: FileTreeElement[] | null) {
        this.content = content;
    }



    



}