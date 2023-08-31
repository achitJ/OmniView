"use client"

import SearchBar from "@/components/DashBoard/SearchBar";
import Table from "@/components/DashBoard/Table";
import { useDataStore } from "@/stores/data";
import { use, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Pagination from "./Pagination";
import Sort from "./Sort";
// import channel from "@/api/pieSocket"


function Loader() {
    return (
        <div className="w-12 h-12 rounded-full animate-spin
        border-4 border-solid border-blue-500 border-t-transparent"></div>
    )
}

export default function Dashboard() {
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        if (useDataStore.getState().users.length === 0) {
            useDataStore.getState().fetchData()
                .then(() => {
                    console.log("Data fetched")
                    useDataStore.getState().setCurrentData("users");
                    setisLoading(false);
                }).catch((err) => {
                    console.log(err)
                });
        } else {
            useDataStore.getState().setCurrentData("users");
            setisLoading(false);
        }
    }, [isLoading])

    return (
        <div className={`${styles.dashboard} border bg-white rounded-lg p-4 flex flex-col justify-between leading-normal`}>
            <div className="flex items-center gap-4">
                <SearchBar />
                <Sort />
            </div>
            <div className="overflow-x-auto w-full mt-5 flex flex-col items-start">
                {isLoading ? <Loader /> : <Table />}
            </div>
            <Pagination />
        </div>
    );
}