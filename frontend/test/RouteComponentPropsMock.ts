// import { RouteComponentProps } from "react-router-dom";
import { createMemoryHistory } from "history";
// TODO add type definition
// export default function createRouteComponentProps(params): RouteComponentProps {
export default function createRouteComponentProps(params) {
    return {
        match: {
            params: params,
            isExact: false,
            path: null,
            url: null,
        },
        location: null,
        history: createMemoryHistory(),
    };
}
