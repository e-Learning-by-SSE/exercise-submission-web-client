import React from "react";
import {Button , Segment, Header, Icon, ButtonProps, Form} from "semantic-ui-react";



export default class Submit extends React.Component {

  

    fileChange = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        let filelist = event.dataTransfer.files;
        for(let i = 0; i < filelist.length; i++){
            console.log(filelist[i]);
        }

    }

    allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    
    /*upload data button with drag and drop field*/
    render(): React.ReactNode {
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


}

