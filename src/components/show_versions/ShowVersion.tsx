import React from "react";

export default class ShowVersion extends React.Component<React.PropsWithChildren<{}>> {
    
        constructor(props: React.PropsWithChildren<{}>) {
            super(props);
    
        }

    
        render(): React.ReactNode {
            return (
                <div className="show-version">
                    Version1 <p/>
                    Version2 <p/>
                    Version3 <p/>
                    Version4 <p/>
                    Version5 <p/>
                    Version6 <p/>
                    Version7 <p/>
                    Version8 <p/>
                    Version9 <p/>
                    Version10 <p/>
                </div>
            );
        }
    }