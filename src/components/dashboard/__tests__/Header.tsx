import renderer from "react-test-renderer";
import Header from "../Header";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../../services/DataService");

describe ("render Header", () => {

    it("with darkmode", () => {

        const header = renderer.create( <Router><Header onChangeVisbility={() =>{} }
         onChangeDarkMode={(darkmode: boolean) =>{} } darkmode={true} /></Router>).toJSON();

        expect(header).toMatchSnapshot();
    });
    it("without darkmode", () => {

        const header = renderer.create(<Router><Header onChangeVisbility={() =>{} }
         onChangeDarkMode={(darkmode: boolean) =>{} } darkmode={false} /></Router>).toJSON();

        expect(header).toMatchSnapshot();
    });

    it("with login", () => {

        const header = renderer.create(<Router><Header onChangeVisbility={() =>{} }
        onChangeDarkMode={(darkmode: boolean) =>{} } darkmode={false} /></Router>).toJSON();

        expect(header).toMatchSnapshot();
    });
    it("without login", () => {

        const header = renderer.create(<Router><Header onChangeVisbility={() =>{} }
        onChangeDarkMode={(darkmode: boolean) =>{} } darkmode={false} /></Router>).toJSON();

        expect(header).toMatchSnapshot();
    });

});