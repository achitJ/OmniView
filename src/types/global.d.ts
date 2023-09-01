export { };

declare global {

    interface IData {
        [key: string]: string
    }

    type DataString = 'users' | 'posts' | 'comments' | 'photos' | 'albums'
    type DataArrayUnion = IUser[] | IPost[] | IComment[] | IPhoto[] | IAlbum[];

    interface IUser extends IData {
        id: number;
        name: string;
        username: string;
        email: string;
        address: string;
        phone: string;
        website: string;
        company: string;
    };

    interface IPost extends IData {
        id: number;
        title: string;
        body: string;
    };

    interface IComment extends IData {
        id: number;
        name: string;
        email: string;
        body: string;
    };

    interface IPhoto extends IData {
        id: number;
        title: string;
        url: string;
        thumbnailUrl: string;
    };


    interface IAlbum extends IData {
        id: number;
        title: string;
    };
}