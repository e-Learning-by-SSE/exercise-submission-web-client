import renderer from "react-test-renderer";
import Sidebar from "../Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import Submit from "../../submit/Submit";

describe ("render Sidebar", () => {
    
        it("with sidebar visible", () => {
    
            const sidebar = renderer.create( <Router><Sidebar menuSelected={<Submit/>} sidebarVisible={true} /></Router>).toJSON();
    
            expect(sidebar).toMatchSnapshot();
        });
        it("without sidebar visible", () => {
    
            const sidebar = renderer.create(<Router><Sidebar menuSelected={<Submit/>} sidebarVisible={false} /></Router>).toJSON();
    
            expect(sidebar).toMatchSnapshot();
        });

    });