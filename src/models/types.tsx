
export type Notation = {
    id: string;
    message: string;
    image?: Image;
    audio?: string;
    createAt: Date;
}

export type Image = {
    path: string;
    height: number;
    width: number;
    mime: string;
}