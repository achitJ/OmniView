interface ITableHeadProps<T extends Object> {
    data: T;
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TableHead<T extends Object>({ data, setSelectAll }: ITableHeadProps<T>) {
    const keys: string[] = data ? Object.keys(data) : [];

    return (
        <thead className="text-left">
            <tr>
                <th className="px-4 py-2">
                    <label htmlFor="SelectAll" className="sr-only">Select All</label>

                    <input
                        type="checkbox"
                        id="SelectAll"
                        className="h-5 w-5 rounded border-gray-300"
                        onChange={(e) => setSelectAll(e.target.checked)}
                    />
                </th>

                {keys.map((item, index) => (
                    <th key={index} className="whitespace-nowrap capitalize px-4 py-2 font-medium text-gray-900">
                        {item}
                    </th>
                ))}
            </tr>
        </thead>
    )
}