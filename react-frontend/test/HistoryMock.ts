import { createLocation, createMemoryHistory } from "history";

export default function createHistory(location?: string) {
    const history = createMemoryHistory();
    history.location = createLocation(!!location ? location : "/");
    return history;
}
