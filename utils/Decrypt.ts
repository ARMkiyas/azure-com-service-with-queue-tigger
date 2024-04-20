import { item } from "./types";

export const decrypt = (data: string) => {
    return JSON.parse(atob(data)) as item<any>;

}