import { 
    getAlbums, 
    getComments, 
    getPhotos, 
    getPosts, 
    getUsers 
} from "@/api/getData";
import config from "@/config";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { getDisplayData, getSearchData, getSortData } from "./utils";

interface IDataStore {
    users: IUser[];
    posts: IPost[];
    comments: IComment[];
    photos: IPhoto[];
    albums: IAlbum[];
    display: IData[];
    searchSort: DataArrayUnion;
    searchQuery: string | undefined;
    currentData: DataString;
    limit: number;
    page: number;
};

interface IDataActions {
    fetchData: () => Promise<void>;
    sortData: (key: DataString, column: string, order: 'asc' | 'desc') => void;
    setDisplayData: (key: DataString) => void;
    setCurrentData: (key: DataString) => void;
    getMaxPage: (key: DataString) => number;
    setPage: (key: DataString, page: 'next' | 'prev') => void;
    setLimit: (limit: number) => void;
    searchData: (key: DataString, query: string) => void;
}

const init: IDataStore = {
    users: [],
    posts: [],
    comments: [],
    photos: [],
    albums: [],
    display: [],
    searchSort: [],
    searchQuery: undefined,
    currentData: "users",
    limit: config.limit,
    page: config.page,
};

export const useDataStore = create<IDataStore & IDataActions>()(
    persist(
        (set, get) => ({
            ...init,
            searchData: (key: DataString, query: string) => {
                const data = getData(key, get);
                const cloneData: DataArrayUnion = JSON.parse(JSON.stringify(data));

                if(!query || query.trim() === '' || query.trim().length < 3) {
                    set({ 
                        searchSort: [],
                        display: getDisplayData(get().page, get().limit, cloneData)
                    });

                    return;
                }
    
                if(data) {
                    const searchData = getSearchData(key, query, cloneData);
    
                    set({ 
                        searchSort: searchData,
                        searchQuery: query,
                        display: getDisplayData(get().page, get().limit, searchData)
                    });
                }
            },
            sortData: (key: DataString, column: string,order: 'asc' | 'desc') => {
                const data = getData(key, get);
                const cloneData: DataArrayUnion = JSON.parse(JSON.stringify(data));
    
                if(data) {
                    const sortedData = getSortData(key, column, order, cloneData);
    
                    set({ 
                        searchSort: sortedData,
                        display: getDisplayData(get().page, get().limit, sortedData)
                    });
                    
                }
            },
            setDisplayData: (key: DataString) => {
                const { limit, page, [key]: data} = get();
    
                if(data) {
                    set({ display: getDisplayData(page, limit, data) });
                }
            },
            fetchData: async () => {
                const [users, posts, comments, photos, albums] = await Promise.all([
                    getUsers(),
                    getPosts(),
                    getComments(),
                    getPhotos(),
                    getAlbums()
                ]);
    
                if(users && posts && comments && photos && albums) {
                    set({ users, posts, comments, photos, albums });
                }
            },
            setCurrentData: (key: DataString) => {
                set({ 
                    currentData: key,
                    display: getDisplayData(init.page, init.limit, get()[key]),
                    page: init.page,
                    limit: init.limit,
                    searchSort: [],
                    searchQuery: undefined
                });
            },
            getMaxPage: (key: DataString) => {
                const { limit } = get();
                const data = getData(key, get);
                const maxPage = Math.ceil(data.length / limit) - 1;
    
                return maxPage;
            },
            setPage(key: DataString, page: 'next' | 'prev') {
                const { page: currentPage, limit } = get();
                const data = getData(key, get);
                const maxPage = Math.ceil(data.length / limit) - 1;
    
                if(page === 'next' && currentPage < maxPage) {
                    set({ 
                        page: currentPage + 1, 
                        display:  getDisplayData(currentPage + 1, limit, data)
                    });
                }
    
                if(page === 'prev' && currentPage > 0) {
                    set({ 
                        page: currentPage - 1,
                        display:  getDisplayData(currentPage - 1, limit, data)
                    });
                }
            },
            setLimit: (limit: number) => {
                const { currentData } = get();
                const data = getData(currentData, get);
    
                if(data) {
                    set({ 
                        limit,
                        page: init.page,
                        display:  getDisplayData(init.page, limit, data)
                    });
                }
            }
        }),
        {
            name: 'data-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                users: state.users,
                posts: state.posts,
                comments: state.comments,
                photos: state.photos,
                albums: state.albums,
            })
        }
    )
);

function getData(key: DataString, get: () => (IDataStore & IDataActions)) {
    const searchSort = get().searchSort;

    if(searchSort.length) {
        return searchSort;
    }

    return get()[key];
}