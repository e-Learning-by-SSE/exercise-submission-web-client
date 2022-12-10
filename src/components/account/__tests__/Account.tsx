import renderer from "react-test-renderer";
import Account from "../Account";
import { UserDto, UserDtoRoleEnum } from "stumgmtbackend";

it("render Account",()   => {
    const userDto: UserDto = {
        username: "test",
        id: "1",
        role: UserDtoRoleEnum.USER,
        displayName: "test"
    }
    const account = renderer.create(<Account user={userDto}></Account>).toJSON();
    expect(account).toMatchSnapshot();
});
