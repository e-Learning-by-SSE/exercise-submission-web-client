import React from "react";
import {Button , Segment, Header, Icon, ButtonProps, Form} from "semantic-ui-react";
import { SubmitState } from "../../constants/Submit";
import TreeView from "./TreeView";
import { Zip } from "../../util/ZipHelper";
import JSZip from "jszip";
import Stack from "../../stacks/Stack";
import { SubmitStack } from "../../stacks/SubmitStack";



export default class Submit extends React.Component<React.PropsWithChildren<{}>, {submitState: string}> {

    private dropfilecode: React.ReactElement<any, string | React.JSXElementConstructor<any>> ;
    private filetreecode: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null = null;

    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = {submitState: SubmitState.DROPFILE};
        this.dropfilecode = this.getDropFileCode();
        


    }

    private getDropFileCode(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
        <div onDrop={this.fileChange} onDragOver={this.allowDrop}>
            <Segment placeholder>
                <Header icon>
                <Icon name='file code outline' />
                No documents are listed for this customer.
                </Header>
            </Segment>
        </div>
        );

    }

    private getFileTreeCode(filelist: JSZip.JSZipObject[]): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <div className="file-tree-component">
                <TreeView filelist={filelist}/>
                <div className="upload-button">
                    {this.getUploadButton()}
                </div>
            </div>
        );
    }

    private getUploadButton(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <div className="upload-button">
                <Button>Upload</Button>
            </div>);
        
    }

    
  

    fileChange = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        let filelist = event.dataTransfer.files;
        let zip = new Zip(filelist[0]).getFiles();

        zip.then((filelist) => {
            this.filetreecode = this.getFileTreeCode(filelist);
            this.setState({submitState: SubmitState.FILETREE});
        });
        

    }

    allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    
    /*upload data button with drag and drop field*/
    render() {
        return (
            <div className="submit">
                {this.state.submitState== SubmitState.DROPFILE ? this.dropfilecode :
                 this.state.submitState== SubmitState.FILETREE ? this.filetreecode : null}
            <Stack stack={SubmitStack} selected={this.state.submitState} />
            </div>
        );
    }


}

