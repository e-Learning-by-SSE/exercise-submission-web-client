import renderer from "react-test-renderer";
import Help from "../Help";
import DataService from "../../../services/DataService";
import { act, render, screen, waitFor } from "@testing-library/react";


jest.mock("../../../services/DataService");


it("render Help", async ()  => {
    
   
    const account = render(<Help onClosed={() => {}}/>);

    await waitFor(() => screen.getByText("test"));

    expect(account).toMatchSnapshot();
    
    
});
