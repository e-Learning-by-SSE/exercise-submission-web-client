import React from "react";

export default class ShowVersion extends React.Component<React.PropsWithChildren<{}>> {
    
        constructor(props: React.PropsWithChildren<{}>) {
            super(props);
    
        }

    
        render(): React.ReactNode {
            return (
                <div className="show-version">
                    Version1
                    Version2 
                    Version3 
                    Version4 
                    Version5 
                    Version6 
                    Version7 
                    Version8 
                    Version9 
                    Version10 
                </div>
            );
        }
    }