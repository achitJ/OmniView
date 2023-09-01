"use client"

import { useDataStore } from "@/stores/data";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { channelPromise } from "@/api/pieSocket"

export default function Sort() {
    const [showMenu, setShowMenu] = useState(false);
    const [sort, setSort] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState("");
    const getColumns = Object.keys(useDataStore(state => state.display)[0] ?? {});
    const sortData = useDataStore(state => state.sortData);
    const currentData = useDataStore(state => state.currentData);

    useEffect(() => {
        channelPromise.then(channel => {
            channel.listen("sort-data", (
                { data, column, sort }:
                    { data: DataString, column: string, sort: "asc" | "desc" }
            ) => {
                sortData(data, column, sort);
                setSortColumn(column);
                setSort(sort);
            });
        });
    }, []);

    useEffect(() => {
        sortData(currentData, sortColumn, sort);
        channelPromise.then(channel => {
            channel.publish("sort-data", { data: currentData, column: sortColumn, sort });
        });
    }, [sortColumn, sort]);

    useEffect(() => {
        sortData(currentData, "", sort);
        channelPromise.then(channel => {
            channel.publish("sort-data", { data: currentData, column: "", sort });
        });
    }, [currentData]);

    return (
        <div className="relative">
            <div
                className="inline-flex items-center overflow-hidden rounded-md border bg-white"
            >
                <div
                    className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                    Sort
                </div>

                <button
                    className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <span className="sr-only">Menu</span>
                    <IconChevronDown size={20} />
                </button>
            </div>

            <div
                className={`${showMenu ? "" : "hidden"} absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg`}
                role="menu"
            >
                <div className="p-2">
                    {getColumns.map((column, index) => (
                        <div
                            className={`${column == sortColumn ? "bg-gray-100 text-gray-900" : "text-gray-500"} block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 hover:text-gray-700`}
                            role="menuitem"
                            key={index}
                            onClick={() => {
                                if (sortColumn === column) {
                                    setSortColumn("");
                                    return;
                                }

                                setSortColumn(column);
                            }}
                        >
                            {column}
                        </div>
                    ))}
                </div>

                <div className="p-2 flex items-center justify-center gap-2">
                    <div className="text-sm text-gray-500">
                        asc
                    </div>
                    <label htmlFor="AcceptConditions" className="relative h-8 w-12 cursor-pointer">
                        <input
                            type="checkbox"
                            id="AcceptConditions"
                            className="peer sr-only"
                            onChange={() => setSort(sort === "asc" ? "desc" : "asc")}
                        />

                        <span className="absolute inset-0 m-auto h-2 rounded-full bg-gray-300"></span>

                        <span
                            className="absolute inset-y-0 start-0 m-auto h-6 w-6 rounded-full bg-gray-500 transition-all peer-checked:start-6 peer-checked:[&_>_*]:scale-0"
                        >
                            <span
                                className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-gray-200 transition"
                            >
                            </span>
                        </span>
                    </label>
                    <div className="text-sm text-gray-500">
                        dec
                    </div>
                </div>
            </div>
        </div>
    );
}