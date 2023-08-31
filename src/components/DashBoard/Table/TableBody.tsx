"use client"

import { useEffect, useState } from "react"

interface ITableBodyProps<T> {
    data: IData[]
    selectAll: boolean
}

export default function TableBody<T extends Object>({ data, selectAll }: ITableBodyProps<T>) {
    return (
        <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => {
                return (
                    <TableRow
                        key={index}
                        index={index}
                        selectAll={selectAll}
                        item={item}
                    />
                )
            })}
        </tbody>
    )
}

export function TableRow({
    index, selectAll, item
}: {
    index: number, selectAll: boolean, item: IData
}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(selectAll);
    }, [selectAll]);

    return (
        <tr>
            <td className="px-4 py-2">
                <label className="sr-only" htmlFor={`Row${index}`}>Row {index}</label>

                <input
                    className="h-5 w-5 rounded border-gray-300"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    id={`Row${index}`}
                />
            </td>

            {Object.values(item).map((value, index) => (
                <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {value.length > 50 ? value.substring(0, 50) + "..." : value}
                </td>
            ))}
        </tr>
    )
}