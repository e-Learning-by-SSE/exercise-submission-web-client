import renderer from "react-test-renderer";
import { ShowVersionState } from "../../constants/ShowVersion";
import { ShowVersionStack } from "../ShowVersionStack";
import Stack from "../Stack";

it("render Stack",()   => {
    const stack = renderer.create(<Stack stack={ShowVersionStack} selected={ShowVersionState.DRAWTABLE}/>).toJSON();
    expect(stack).toMatchSnapshot();
});