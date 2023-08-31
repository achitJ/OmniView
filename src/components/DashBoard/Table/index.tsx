'use client'

import { useDataStore } from "@/stores/data"
import TableBody from "./TableBody"
import TableHead from "./TableHead"
import { useState } from "react";

export default function Table() {
    const [selectAll, setSelectAll] = useState(false);
    const data = useDataStore(state => state.display);

    return (
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <TableHead data={data[0]} setSelectAll={setSelectAll}/>
            <TableBody data={data} selectAll={selectAll}/>
        </table>
    )
}