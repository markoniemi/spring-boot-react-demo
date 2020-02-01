import { RouteComponentProps } from "react-router-dom";
import { createLocation, createMemoryHistory } from "history";

export default function createRouteComponentProps(params): RouteComponentProps<any> {
    return {
        match: {
            params: params,
            isExact: false,
            path: null,
            url: null,
        },
        location: createLocation(""),
        history: createMemoryHistory(),
    };
}
