export default function createRouteComponentProps(params) {
    return {
        match: {
            params: params,
            isExact: false,
            path: null,
            url: null,
        },
        location: null,
        history: null,
    };
}
