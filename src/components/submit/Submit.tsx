import React from "react";
import {Button , Segment, Header, Icon} from "semantic-ui-react";



export default class Submit extends React.Component {


    
    /*upload data button with drag and drop field*/
    render(): React.ReactNode {
        return (
            <Segment placeholder>
                <Header icon>
                <Icon name='file code outline' />
                No documents are listed for this customer.
                </Header>
                <Button primary>Add Document</Button>
            </Segment>

        );
    }


}

