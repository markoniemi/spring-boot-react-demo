import App from "../../src/components/App";
import sleep from "es7-sleep";
import { History } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";

export default class AbstractPage {
    public static async render(history: History): Promise<void> {
        render(<App history={history} />);
        await sleep(100);
    }
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
