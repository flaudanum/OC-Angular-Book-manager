/** Descriptive model of a book */
export class Book {
    photo: string;
    synopsis: string;

    constructor(public title: string, public author: string) {
    }
}