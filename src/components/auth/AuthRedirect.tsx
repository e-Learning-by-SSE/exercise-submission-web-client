import react from "react";
import {Navigate } from "react-router-dom";
import OICDClient from "../../services/OicdClient";



export default class AuthRedirect extends react.Component<React.PropsWithChildren<{}>,{}> {
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        let client = new OICDClient();
        client.loginRedirect(window.location.toString()).then((value) => {
            console.log(value);
        });
    }

    render() {
        return <Navigate to="/dashboard" />;
    }
}