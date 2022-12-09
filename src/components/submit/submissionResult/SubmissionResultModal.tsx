import React from "react";
import { SubmissionResultDto } from "exerciseserverclientlib"; 
import {Modal, Button, Table, Label,Icon, Header} from "semantic-ui-react";
import SubmissionResultTable from "./SubmissionResultTable";




export default class SubmissionResultModal extends React.Component<React.PropsWithChildren<{result: SubmissionResultDto,onClosed: () => void}>,{open: boolean}> {
        constructor(props: React.PropsWithChildren<{result: SubmissionResultDto, onClosed: () => void}>) {
            super(props);
            this.state = {open: true};
        }


        private createModal(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
            return(
                    <SubmissionResultTable result={this.props.result}/>

            );
        }

        render() {
            return (
               <div className="submissionResultModal">
                    <Modal open={this.state.open} onClose={this.props.onClosed}>
                        <Modal.Header><Header size="large">Submission Result</Header></Modal.Header>
                        <Modal.Content>
                            {this.createModal()}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="red" onClick={() => {this.setState({open: false}); this.props.onClosed()}}>
                                <Button.Content><Icon name="remove"/>Close</Button.Content>
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            );
        }

}