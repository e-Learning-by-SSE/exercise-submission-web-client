import React, { PropsWithChildren } from "react";
import { List } from "semantic-ui-react";


export default class TreeView extends React.Component<PropsWithChildren<{ filelist: FileList }>> {

  

    constructor(props: PropsWithChildren<{ filelist: FileList }>) {
        super(props);
     
    }

    private generateTreeViewFromFileSystem(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {

        const fileList = [];

        for(let file of this.props.filelist) {
            fileList.push(this.generateListElement(file));
        }

        return (
            <div className="tree-view">
                {fileList}
            </div>


        )

    }


    private generateListElement(file : File): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <List.Item>
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