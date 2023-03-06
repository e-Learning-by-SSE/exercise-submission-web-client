import { env } from "../../env";

export default class CurrentCourse {

    private courseid: string;

    constructor() {
        this.courseid = this.retrieveSelectedCourse();
    }

    private retrieveSelectedCourse(): string {
        let courseid = localStorage.getItem('selectedCourse');
        if(courseid == null) {
           courseid = env.REACT_APP_COURSEID
        }
        return courseid;
    }

    public getCourseId(): string {
        return this.courseid;
    }
    
    public setCourseId(courseid: string): void {
        this.courseid = courseid;
        localStorage.setItem('selectedCourse', courseid);
    }



}
