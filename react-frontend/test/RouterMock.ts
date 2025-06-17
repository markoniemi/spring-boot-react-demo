import * as router from "react-router";
import {vi} from "vitest";

export function setLocation(location?: string): void {
    window.history.replaceState({}, "", location);
}

export const navigate = vi.fn();
vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
