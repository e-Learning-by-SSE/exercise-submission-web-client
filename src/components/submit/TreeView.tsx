import JSZip from "jszip";
import React, { PropsWithChildren } from "react";
import { List , Segment} from "semantic-ui-react";


export default class TreeView extends React.Component<PropsWithChildren<{ filelist: JSZip.JSZipObject[] | FileList}>> {

  

    private generateTreeViewFromFileSystem(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {

        const fileList = [];
        const baseFileList = this.props.filelist

        
        for(let file of baseFileList) {
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