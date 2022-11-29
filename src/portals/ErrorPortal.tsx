import React from "react";
import {Portal, Segment, Button,Header,  Message, Icon} from "semantic-ui-react";


export default class ErrorPortal extends React.Component<React.PropsWithChildren<{error : {header: string, description:string}, onReady: () => void}>, {open: boolean, error : {header: string, description:string}}> {
    constructor(props: React.PropsWithChildren<{error : {header: string, description:string}, onReady: () => void}>) {
        super(props);
        this.state = {open: true, error: this.props.error};
    }

    handleClose = () => {
        this.setState({ open: false })
        this.props.onReady();
    }
  
   
    private createPortal() {
        return(
            <Portal onClose={this.handleClose} open={this.state.open}>
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '50%',
                zIndex: 1000,
              }}
            >
            <Header>Error</Header>
              <Message negative icon>
                <Icon name='warning sign' />
                <Message.Content>
                    <Message.Header>{this.state.error.header}</Message.Header>
                    {this.state.error.description}
             </Message.Content>
                </Message>
              <Button
                content='Close Portal'
                negative
                onClick={this.handleClose}
              />

            </Segment>
          </Portal>

        );
    }

    render() {
        return (
            <div className="error-portal">
                {this.createPortal()}
            </div>
        );
    }






}