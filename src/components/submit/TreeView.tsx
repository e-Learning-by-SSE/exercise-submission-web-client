import JSZip from "jszip";
import React, { PropsWithChildren } from "react";
import { List , Segment} from "semantic-ui-react";
import PathHelper from "../../util/PathHelper";
import FileTreeElement from "./FileTreeElement";


export default class TreeView extends React.Component<PropsWithChildren<{ filelist: JSZip.JSZipObject[] }>> {

  

    constructor(props: PropsWithChildren<{ filelist: JSZip.JSZipObject[] }>) {
        super(props);
     
    }

    private generateTreeViewFromFileSystem(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {

        const fileList = [];
        const baseFileList = this.props.filelist
        
        let maindir = new PathHelper(baseFileList.at(0)?.name as string).getPathElements()[0];

        //first ebene

        for(let file of baseFileList) {
            if(!file.dir)
           fileList.push(this.generateListElement(file));
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

   


    private generateListElement(file : JSZip.JSZipObject): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
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