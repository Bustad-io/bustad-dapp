interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void
}

export function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationBarProps) {
    if(totalPages > 1) {
        return (
            <div className="flex space-x-1">
                {Array(totalPages)
                    .fill('')
                    .map((_, index) => <button onClick={() => onPageChange(index)} key={index} className={`cursor-pointer w-[25px] font-semibold text-xs bg-white text-center rounded py-[1px] ${currentPage !== index && 'opacity-75'}`}>{index + 1}</button>)}
            </div>);
    }
    return <></>;
    
}