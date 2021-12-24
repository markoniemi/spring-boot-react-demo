import { createLocation, createMemoryHistory, History } from "history";

export default function createHistory(location?: string): History {
    const history = createMemoryHistory();
    history.location = createLocation(!!location ? location : "/");
    return history;
}
