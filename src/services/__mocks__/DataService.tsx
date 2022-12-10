import { UserDto, UserDtoRoleEnum } from "stumgmtbackend";

export default class DataService {
    constructor() {
    }

    public async getCurrentUserDto(): Promise<UserDto> {
        return new Promise<UserDto>((resolve, reject) => {
            resolve({
                username: "test",
                 id: "1",
                 role: UserDtoRoleEnum.USER,
                displayName: "test"
            });
        });
    }
}