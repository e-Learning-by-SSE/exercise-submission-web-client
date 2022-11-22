
export default class PathHelper {

    private path:string;

    constructor(path:string) {
        this.path = path;
    }

    public getPathElements(): string[] {
      return  this.getElements(this.path);
    }

    private getElements(path:string): string[] {
        return  path.split("/");
    }
      

    public isInDir(dir: string): boolean {
        let dirElements = this.getElements(dir);
        let pathElements = this.getPathElements();

        if(pathElements.length > 1 && dirElements[dirElements.length-1] == pathElements[pathElements.length-2]) {
            return true;
        } else {
            return false;
        }
    }

    public static getLongestCommonPath(paths: string[]): number {
        let longestCommonPathElements: string[] = [];

        for(let path of paths) {
            let pathElements = new PathHelper(path).getPathElements();
            if(pathElements.length > longestCommonPathElements.length) {
                longestCommonPathElements = pathElements;
            }
        }
        return longestCommonPathElements.length;
    }




}