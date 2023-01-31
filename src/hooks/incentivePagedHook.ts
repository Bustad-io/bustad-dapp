import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectIncentives } from "../features/incentive/incentiveSlice";

const PAGE_SIZE = 2;

export function useIncentivePaged() {
    const pageSize = PAGE_SIZE;
    const incentives = useAppSelector(selectIncentives);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);    

    const skip = pageSize * currentPageNumber;
    const take = pageSize;
    const totalPages = Math.ceil(incentives.length / pageSize);

    const pagedIncentives = incentives.slice(skip, skip + take);

    function onPageChange(newPageNumber: number) {
        setCurrentPageNumber(newPageNumber);
    }

    return {
        pagedIncentives,
        totalPages,
        currentPageNumber,
        onPageChange
    }
}