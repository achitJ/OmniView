import { useDataStore } from "@/stores/data";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function Pagination() {
    const page = useDataStore(state => state.page);
    const currentData = useDataStore(state => state.currentData);
    const getMaxPage = useDataStore(state => state.getMaxPage);
    const setPage = useDataStore(state => state.setPage);
    const setLimit = useDataStore(state => state.setLimit);

    return (
        <div className="flex gap-4 mt-4">
            <div className="inline-flex justify-center gap-1">

                {page > 0 && (
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        onClick={() => setPage(currentData, 'prev')}
                    >
                        <span className="sr-only">First Page</span>
                        <IconChevronLeft />
                    </button>
                )}

                <div>
                    <label htmlFor="PaginationPage" className="sr-only">Page</label>

                    <input
                        type="number"
                        className="h-8 w-12 rounded border border-gray-100 bg-white p-0 text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        min="1"
                        value={page + 1}
                        id="PaginationPage"
                        disabled
                    />
                </div>

                {page < getMaxPage(currentData) && (
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        onClick={() => setPage(currentData, 'next')}
                    >
                        <span className="sr-only">Next Page</span>
                        <IconChevronRight />
                    </button>
                )}
            </div>

            <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="w-20 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                onChange={(e) => {
                    const limit = parseInt(e.target.value);
                    setLimit(limit);
                }}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        </div>
    )
}