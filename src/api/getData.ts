const jsonAPI = process.env.NEXT_PUBLIC_JSON_API;

interface IRawUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        city: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
    };
};

export const getUsers = async (): Promise<IUser[] | undefined> => {
    try {
        const response = await fetch(`${jsonAPI}/users`);
        const data = await response.json();
        const users: IUser[] = data.map((user: IRawUser) => {
            const { id, name, username, email, address, phone, website, company } = user;
            return {
                id,
                name,
                username,
                email,
                address: `${address.street}, ${address.city}`,
                phone,
                website,
                company: company.name
            }
        })

        return users;
    } catch(err) {
        if(err && err instanceof Error) {
            console.log(err.message)
        }
    }
};

export const getPosts = async (): Promise<IPost[] | undefined> => {
    try {
        const response = await fetch(`${jsonAPI}/posts`);
        const data = await response.json();
        const posts: IPost[] = data.map((post: IPost) => {
            const { id, title, body } = post;
            return {
                id,
                title,
                body
            }
        })

        return posts;
    } catch(err) {
        if(err && err instanceof Error) {
            console.log(err.message)
        }
    }
}

export const getComments = async (): Promise<IComment[] | undefined> => {
    try {
        const response = await fetch(`${jsonAPI}/comments`);
        const data = await response.json();
        const comments: IComment[] = data.map((comment: IComment) => {
            const { id, name, email, body } = comment;
            return {
                id,
                name,
                email,
                body
            }
        })

        return comments;
    } catch(err) {
        if(err && err instanceof Error) {
            console.log(err.message)
        }
    }
}

export const getPhotos = async (): Promise<IPhoto[] | undefined> => {
    try {
        const response = await fetch(`${jsonAPI}/photos`);
        const data = await response.json();
        const photos: IPhoto[] = data.map((photo: IPhoto) => {
            const { id, title, url, thumbnailUrl } = photo;
            return {
                id,
                title,
                url,
                thumbnailUrl
            }
        })

        return photos;
    } catch(err) {
        if(err && err instanceof Error) {
            console.log(err.message)
        }
    }
}

export const getAlbums = async (): Promise<IAlbum[] | undefined> => {
    try {
        const response = await fetch(`${jsonAPI}/albums`);
        const data = await response.json();
        const albums: IAlbum[] = data.map((album: IAlbum) => {
            const { id, title } = album;
            return {
                id,
                title
            }
        })

        return albums;
    } catch(err) {
        if(err && err instanceof Error) {
            console.log(err.message)
        }
    }
}