import { UserManager, User, Log } from "oidc-client-ts"
import { env } from "../env"



export default class OICDClient {

    private userManager: UserManager;

    constructor() {
        Log.setLogger(console);
        this.userManager = new UserManager({
            authority: env.REACT_APP_AUTHORITY ? env.REACT_APP_AUTHORITY : "https://localhost:5001",
            client_id: env.REACT_APP_CLIENTID ? env.REACT_APP_CLIENTID : "testID",
            redirect_uri: env.REACT_APP_REDIRECTURI ? env.REACT_APP_REDIRECTURI : "http://localhost:3000/callback",
        });
    }

    public async login(): Promise<void> {
        await this.userManager.signinRedirect();
    }

    public async loginRedirect(url: string): Promise<void> {
        await this.userManager.signinRedirectCallback(url);
    }

    public async logout(): Promise<void> {
        await this.userManager.signoutRedirect();
    }

    public async getUser(): Promise<User> {
        let user = await this.userManager.getUser();
        if (user == null) {
            return Promise.reject("No user");
        }
        return user;
    }

    public async handleCallback(): Promise<void> {
        await this.userManager.signinRedirectCallback();
    }

    public async getTokens(): Promise<{ accessToken: string, refreshToken: string | undefined }> {
        let user = await this.getUser();
        return { accessToken: user.access_token, refreshToken: user.refresh_token };
    }

}

