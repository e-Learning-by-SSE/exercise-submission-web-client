import JSZip from "jszip";
import React, { PropsWithChildren } from "react";
import { List , Segment} from "semantic-ui-react";
import PathHelper from "../../util/PathHelper";
import FileTreeElement from "./FileTreeElement";


export default class TreeView extends React.Component<PropsWithChildren<{ filelist: JSZip.JSZipObject[] | FileList}>> {

  

    constructor(props: PropsWithChildren<{ filelist: JSZip.JSZipObject[] | FileList }>) {
        super(props);
     
    }

    private generateTreeViewFromFileSystem(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {

        const fileList = [];
        const baseFileList = this.props.filelist

        if(baseFileList instanceof FileList) {
            for(let file of baseFileList) {
               fileList.push(this.generateListElement(file));
            }

        } else{

            let maindir = new PathHelper(baseFileList.at(0)?.name as string).getPathElements()[0];
    
            //first ebene
    

        }    
        

        return (
            <div className="tree-view">
                <Segment>
                 <List>
                    {fileList}
                </List>
                </Segment>
            </div>


        )

    }

   


    private generateListElement(file : JSZip.JSZipObject | File): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <List.Item key={file.name}>
                <List.Icon name='file' />
                <List.Content>
                    <List.Header>{file.name}</List.Header>
                </List.Content>
            </List.Item>
        );
    }

 
    render(){
        return this.generateTreeViewFromFileSystem();
    }
}