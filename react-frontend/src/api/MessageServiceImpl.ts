import { MessageService } from "./MessageService";
import Http from "./Http";

export default class MessageServiceImpl implements MessageService {
    public async getMessage(): Promise<string> {
        const response: Response = await Http.post(this.getApiUrl(), "world");
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Error loading message");
        }
    }
    public getApiUrl(): string {
        return "/api/rest/hello";
    }
}
