import { StackInterface } from "../interface/StackInterface";
export const SubmitStack: StackInterface[] = [

    {
        step: "Result",
        description: "Review Submission Result",
        id: "Result",
        icon: "comment",
        order: 5
    
    },
    {
        step: "Upload",
        description: "Upload Assignment",
        id: "Upload",
        icon: "upload",
        order: 4
    
    },
    {
        step: "Select Assignment",
        description: "Select assignment for Upload",
        id: "SelectAssignment",
        icon: "window maximize",
        order: 3
    },
    {
        step: "View Files",
        description: "View files",
        id: "Filetree",
        icon: "file",
        order: 2
    },
    {
        step: "Drop file",
        description: "Drop file here",
        id: "Dropfile",
        icon: "file",
        order: 1
    }];

    