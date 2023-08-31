"use client"

import { useDataStore } from "@/stores/data";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const setSearchData = useDataStore(state => state.searchData);
    const currentData = useDataStore(state => state.currentData);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        setSearchQuery(value);
        // setSearchData(currentData, value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        }
    }, [searchQuery]);

    useEffect(() => {
        setSearchData(currentData, debouncedValue);
    }, [debouncedValue]);

    useEffect(() => {
        setSearchData(currentData, "");
        setSearchQuery("");
    }, [currentData]);

    return (
        <div className="relative w-1/2">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                onChange={handleSearch}
                value={searchQuery}
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>

                    <IconSearch />
                </button>
            </span>
        </div>
    )
}