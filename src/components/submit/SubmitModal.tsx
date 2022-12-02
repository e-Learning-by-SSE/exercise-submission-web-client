import React from "react";
import JSZip from "jszip";



export default class SubmitModal extends React.Component<React.PropsWithChildren<{files: JSZip.JSZipObject[] | FileList | null}>,{open: boolean}> {
  constructor(props: React.PropsWithChildren<{files: JSZip.JSZipObject[] | FileList | null}>) {   
    super(props);
    if(this.props.files !== null) {
        this.state = {open: true};
    } else {
        this.state = {open: false};
    }
  }




  render(){
    return (
        <></>
        );
  }

}



