import React from "react";
import {
  Pagination,
  PaginationNext,
  PaginationLink,
  PaginationPrevious,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "~/components/ui/pagination";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ClientSidePagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) {
  const previousPage = () => setPage((p) => Math.max(p - 1, 0));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <Pagination>
      <PaginationContent className="gap-0">
        <PaginationItem>
          <Button
            className={cn(
              "bg-white rounded-none text-black hover:bg-gray-300 border-1 border-gray-300 rounded-l-md border-r-0"
            )}
            disabled={page === 0}
            onClick={previousPage}
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <Button
              className={cn(
                "bg-white rounded-none text-black hover:bg-gray-300 border-1 border-r-0 border-gray-300",
                page === index && "bg-emerald-400 hover:bg-emerald-500 text-white"
              )}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            className={cn("bg-white rounded-none text-black hover:bg-gray-300 border-1 border-gray-300 rounded-r-md")}
            onClick={nextPage}
            disabled={page === totalPages}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
