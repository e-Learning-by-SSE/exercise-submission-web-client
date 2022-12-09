import { CheckMessageDtoTypeEnum, SubmissionResultDto } from "exerciseserverclientlib";
import React from "react";
import { Table, Button, ButtonProps,Header, Icon, Label, SemanticCOLORS} from "semantic-ui-react";


export default class SubmissionResultTable extends React.Component<React.PropsWithChildren<{result: SubmissionResultDto }>> {
    constructor(props: React.PropsWithChildren<{result: SubmissionResultDto }>) {
        super(props);
    }

    private createTypeCell(type: CheckMessageDtoTypeEnum): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        let tagColor: SemanticCOLORS = "red";
        if(type === CheckMessageDtoTypeEnum.ERROR) {

        } else if(type === CheckMessageDtoTypeEnum.WARNING) {
            tagColor = "yellow";
        }

        return(
            <Table.Cell>
                <Label tag color={tagColor}>{type}</Label>
            </Table.Cell>
        );
    }

    private createTableBody(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        const tableRows = [];
        for (let i = 0; i < this.props.result.messages.length; i++) {
            const checkResult = this.props.result.messages[i];
            tableRows.push(
                <Table.Row key={i}>
                    <Table.Cell>
                        <Label>{checkResult.checkName}</Label>
                    </Table.Cell>
                    <Table.Cell>
                        <Label>{checkResult.message}</Label>
                    </Table.Cell>
                    <Table.Cell>
                        <Label>{checkResult.file}</Label>
                    </Table.Cell>
                    <Table.Cell>
                        <Label>{checkResult.column}</Label>
                    </Table.Cell>
                    <Table.Cell>
                        <Label>{checkResult.line}</Label>
                    </Table.Cell>
                    <Table.Cell>
                        <Label>{this.createTypeCell(checkResult.type)}</Label>
                    </Table.Cell>
                </Table.Row>
            );
        }

        return(
            <Table.Body>
                {tableRows}
            </Table.Body>
        ); 
    }


    private createTable(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return(
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Checkname
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Message
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    File
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Column
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Line
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Header>
                                <Header.Content>
                                    Type
                                </Header.Content>
                            </Header>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {this.createTableBody()}
            </Table>
        );
    }


    render() {
        return(
                <div className="submissionResultTable">
                    {this.createTable()}
                </div>
        );

    }
}