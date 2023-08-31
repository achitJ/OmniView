import { IconAlbum, IconArchive, IconMessages, IconPhoto, IconUser, TablerIconsProps } from "@tabler/icons-react";
import { ReactNode } from "react";

type DataIcons = {
    [key in DataString]: (props: TablerIconsProps) => JSX.Element
}

export default {
    datas: [
        "users",
        "posts",
        "comments",
        "photos",
        "albums"
    ] as DataString[],
    dataIcons: {
        users: IconUser,
        posts: IconArchive,
        comments: IconMessages,
        photos: IconPhoto,
        albums: IconAlbum
    } as DataIcons,
    limit: 10,
    page: 0,
}