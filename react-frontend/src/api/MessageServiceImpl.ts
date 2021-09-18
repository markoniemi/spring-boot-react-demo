import { MessageService } from "./MessageService";

export default class MessageServiceImpl implements MessageService {
    public async getMessage(): Promise<string> {
        const response: Response = await fetch(this.getApiUrl(), {
            method: "POST",
            body: "world",
        });
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
