export const getDisplayData = (page: number, limit: number, data: DataArrayUnion) => {
    const start = page * limit;
    const end = start + limit;
    const slicedData = data.slice(start, end);
    const display = slicedData.map((item) => {
        const newData: IData = { ...item };

        if (newData && 'id' in newData) delete newData["id"];

        return newData;
    })

    return display;
}

export const getSearchData = (key: DataString, query: string, data: DataArrayUnion) => {
    //REFACTOR - https://github.com/microsoft/TypeScript/issues/36390
    const filteredData: DataArrayUnion = (data as any[]).filter((item: IData) => {
        const values = Object.values(item);
        const valuesToString = values.map((value) => value.toString().toLowerCase());
        const queryToLower = query.toLowerCase();
        const isMatch = valuesToString.some((value) => value.includes(queryToLower));

        return isMatch;
    });

    return filteredData;
}

export const getSortData = (key: DataString, column: string, order: 'asc' | 'desc', data: DataArrayUnion) => {
    const sortedData: DataArrayUnion = data.sort((a, b) => {
        if (a[column] < b[column]) {
            return order === 'asc' ? -1 : 1;
        }

        if (a[column] > b[column]) {
            return order === 'asc' ? 1 : -1;
        }

        return 0;
    });

    return sortedData;
}