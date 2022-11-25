import JSZip from "jszip";
import React, { PropsWithChildren } from "react";
import { List } from "semantic-ui-react";
import PathHelper from "../../util/PathHelper";
import FileTreeElement from "./FileTreeElement";


export default class TreeView extends React.Component<PropsWithChildren<{ filelist: JSZip.JSZipObject[] }>> {

  

    constructor(props: PropsWithChildren<{ filelist: JSZip.JSZipObject[] }>) {
        super(props);
     
    }

    private generateTreeViewFromFileSystem(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {

        const fileList = [];
        const baseFileList = this.props.filelist
        
        let maindir = new PathHelper(baseFileList.at(0)?.name as string).getPathElements()[0];

        //first ebene

        for(let file of baseFileList) {
            let path = new PathHelper(file.name);
            if(path.getPathElements()[0] == maindir && path.getPathElements().length == 2) {
                fileList.push(new FileTreeElement(file, file.dir));
            }
        }

        for(let basedirs of fileList) {
            
            

            



        }

        return (
            <div className="tree-view">
             
            </div>


        )

    }

   
    
    


    private generateListElement(file : JSZip.JSZipObject): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <List.Item>
                <List.Icon name='file' />
                <List.Content>
                    <List.Header>{file.name}</List.Header>
                </List.Content>
            </List.Item>
        );
    }

 

    


    render(){
        return this.generateTreeViewFromFileSystem();
    }
}