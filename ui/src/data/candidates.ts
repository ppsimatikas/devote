import {blueColor, redColor} from "../theme";

export interface Candidate {
    color: string;
    title: string;
    image: string;
}

export const candidates: Candidate[] = [
    {
        color: redColor,
        title: "Republicans",
        image: "trump.avif"
    },
    {
        color: blueColor,
        title: "Democrats",
        image: "biden.webp"
    }
]