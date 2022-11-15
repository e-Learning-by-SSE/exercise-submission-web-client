import React from "react";


export default class DashboardStateHandler extends React.Component<React.PropsWithChildren<{}>, any> {
    
        constructor(props: React.PropsWithChildren<{}>) {
            super(props);
            this.state = {selectedMenu: this.props.children}
            this.state = {baseMenu: this.props.children}
        }

        handleStateChange(selectedMenu: any) { 
            this.setState({selectedMenu: selectedMenu});
        }


        render() {


            if(this.props.children != this.state.baseMenu) {
                this.setState({baseMenu: this.props.children});
                this.setState({selectedMenu: this.props.children});
            } 
           
            return (
                <div className="dashboard-state-handler">
                    {this.state.selectedMenu==null ? this.props.children:this.state.selectedMenu}
                </div>
            );
        }

    }