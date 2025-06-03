import { ICharacter } from "./character.model";

export interface IApiResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: ICharacter[];
}