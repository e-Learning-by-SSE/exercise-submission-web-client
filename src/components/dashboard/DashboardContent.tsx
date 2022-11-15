import React from "react";





export default class DashboardContent extends React.Component<React.PropsWithChildren<{}>> {

    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        
    }
    
    render(): React.ReactNode {

        return (
            <div className="dashboard-content">
                {this.props.children}
            </div>
        );
    }
}