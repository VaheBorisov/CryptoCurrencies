import React from "react";

import "./Pagination.css"

export default function Pagination({page, totalPages, handlePaginationClick}) {

    return (
        <div className="Pagination">
            <button
                disabled={page === 1}
                className="Pagination-button" 
                onClick={() => handlePaginationClick('prev')}
            >
                &larr; 
            </button>
                <span>{page} of {totalPages}</span>
            <button 
                disabled={page === totalPages}
                className="Pagination-button" 
                onClick={() => handlePaginationClick('next')}
            >
                &rarr; 
            </button>
        </div>
    )
}