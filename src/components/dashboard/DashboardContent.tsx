import React from "react";





export default class DashboardContent extends React.Component<React.PropsWithChildren<{}>> {

   
    
    render(): React.ReactNode {

        return (
            <div className="dashboard-content">
                {this.props.children}
            </div>
        );
    }
}