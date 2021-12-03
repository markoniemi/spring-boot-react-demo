import { fireEvent, screen } from "@testing-library/react";

export default class AbstractPage {
    public static async getValueById(id: string): Promise<string> {
        return ((await screen.getByTestId(id)) as HTMLInputElement).value;
    }
    public static async getTextsById(id: string): Promise<string[]> {
        const elements = (await screen.getAllByTestId(id)) as HTMLInputElement[];
        return elements.map((element) => element.textContent);
    }

    public static async findButton(id: string): Promise<HTMLInputElement> {
        return (await screen.getByTestId(id)) as HTMLInputElement;
    }

    public static async setText(id: string, text: string): Promise<void> {
        fireEvent.change((await screen.getByTestId(id)) as HTMLInputElement, { target: { value: text } });
    }

    public static async selectOption(id: string, value: string): Promise<void> {
        fireEvent.change((await screen.getByTestId(id)) as HTMLInputElement, { target: { value: value } });
    }
}
