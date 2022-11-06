import React from "react";
import {Button , Segment, Header, Icon, ButtonProps, Form} from "semantic-ui-react";



export default class Submit extends React.Component {

  

    fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log(event.target.files);
    }

    
    /*upload data button with drag and drop field*/
    render(): React.ReactNode {
        return (
            <Segment placeholder>
                <Header icon>
                <Icon name='file code outline' />
                No documents are listed for this customer.
                </Header>
                <Form>
                    <Form.Button primary htmlFor="fileInput" type="submit" className="upload-file">Add Document</Form.Button>
                    <input
                    type="file"
                    id="fileInput"
                    name="file-input"
                    onChange={this.fileChange}
                    />
                </Form>

            </Segment>

        );
    }


}

