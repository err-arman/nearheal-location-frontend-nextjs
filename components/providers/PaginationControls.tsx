import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/hooks/useAuth";
import { authServerInfo } from "@/lib/auth";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;
  const { user } = useAuth();

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* First page */}
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis if needed */}
          {currentPage > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Pages around current page */}
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            // Only show pages close to current page
            if (
              pageNum === currentPage ||
              pageNum === currentPage - 1 ||
              pageNum === currentPage + 1
            ) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() =>
                      user?.id
                        ? onPageChange(pageNum)
                        : (window.location.href = `${authServerInfo.url}/login?token=${authServerInfo.clientId}&redirect_url=${authServerInfo.redirectUrl}`)
                    }
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}

          {/* Ellipsis if needed */}
          {currentPage < totalPages - 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page */}
          {currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  user?.id
                    ? onPageChange(totalPages)
                    : (window.location.href = `${authServerInfo.url}/login?token=${authServerInfo.clientId}&redirect_url=${authServerInfo.redirectUrl}`)
                }
                className="cursor-pointer"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
