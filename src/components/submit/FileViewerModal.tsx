import React from "react";
import syntax from "highlight.js";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";


import { Header, Modal, Button, Icon, Divider, Placeholder } from "semantic-ui-react";
import { HLJSApi } from "highlight.js";
import parse from "html-react-parser";

import "highlight.js/styles/vs.css";



export default class FileViewerModal extends React.Component<React.PropsWithChildren<{ onClosed: () => void, fileContent: string, fileName: string}>,
 {open: boolean, fileContentView: any}> {

    private static languages = new Map<string, any>([
        ["javascript", javascript],
        ["typescript", typescript],
        ["xml", xml],
        ["css", css],
        ["json", json],
        ["java", java],
        ["python", python]
    ]);

    private syntax: HLJSApi = syntax;
    private contentLoaded: boolean = false;

    constructor(props: React.PropsWithChildren<{onClosed: () => void, fileContent: string, fileName: string}>) {
        super(props);
        this.state = {open: true, fileContentView: this.createPlaceHolder()};
        this.registerLanguages();
    }
    private registerLanguages() {
        for (const key in FileViewerModal.languages) {
            if (FileViewerModal.languages.hasOwnProperty(key)) {
                const element = FileViewerModal.languages.get(key);
                this.syntax.registerLanguage(key, element);
            }
        }
    }

    private createPlaceHolder(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {

        return (<Placeholder fluid>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>);
    }
           

    private createModal(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <Modal open= {this.state.open} >
            <Modal.Header size="large">File-Viewer</Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description>
                    <Header size="large">{this.props.fileName}</Header>
                    <Divider/>
                </Modal.Description>
                    {this.state.fileContentView}    
            </Modal.Content>
            <Modal.Actions>
                <Button icon color='red' onClick={() =>{ this.setState({open: false}); this.props.onClosed()}}>
                    <Icon name='close' />
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
        );
    }

    private async highlightCode(content: string) : Promise<any>{
        return await this.syntax.highlightAuto(content).value;
    }

            

    render (){
        if(!this.contentLoaded) {
            this.highlightCode(this.props.fileContent).then((value) => {

                value = value.replaceAll("\n", " <br> ");
                value = value.replaceAll(' ', " &nbsp; ");
                
                this.setState({fileContentView: parse(value)});
                this.contentLoaded = true;
            });
           
        }
        return (
            <div className="FileViewerModal">
                {this.createModal()}
            </div>

        );

                            
    }




 }