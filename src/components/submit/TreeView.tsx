import JSZip from "jszip";
import React, { PropsWithChildren } from "react";
import { List , ListItemProps, Segment} from "semantic-ui-react";
import FileViewerModal from "./FileViewerModal";



export default class TreeView extends React.Component<PropsWithChildren<{ filelist: JSZip.JSZipObject[] | FileList}>, {fileViewer: any}> {

    constructor(props: PropsWithChildren<{ filelist: JSZip.JSZipObject[] | FileList}>) {
        super(props);
        this.state = {fileViewer: null};
    }

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
                {this.state.fileViewer}
            </div>

        )

    }
    onClickItem = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ,data: ListItemProps) => {
        event.preventDefault();
        for(let file of this.props.filelist) {
            if(file.name === data.value) {
                if(file instanceof File) {
                    this.readFileToString(file).then((content) => {
                        this.setState({fileViewer: <FileViewerModal onClosed={() => this.setState({fileViewer: null})} fileContent={content} fileName={file.name} />});
                    });
                } else {
                    file.async("string").then((content) => {
                        this.setState({fileViewer: <FileViewerModal onClosed={() => this.setState({fileViewer: null})} fileContent={content} fileName={file.name} />});
                    });
                }
            }
        }
    }

    // read file to string
    private readFileToString(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if(event.target) {
                    resolve(event.target.result as string);
                } else {
                    reject("Error while reading file");
                }
            }
            reader.readAsText(file);
        });
    }

    private generateListElement(file : JSZip.JSZipObject | File): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <List.Item key={file.name} onClick={this.onClickItem} value={file.name}>
                <List.Icon name='file' />
                <List.Content>
                    <List.Header as='a'>{file.name}</List.Header>
                    <List.Description as='a'>Click on file to view it</List.Description>
                </List.Content>
            </List.Item>
        );
    }

 
    render(){
        return this.generateTreeViewFromFileSystem();
    }
}