import React, { Component } from 'react'

export class BottomButtons extends Component {
    render() {
      const { currentPage, totalPage,onPrevClick, onPageClick, onNextClick } = this.props;
    return (
        <div className="flex justify-around mt-4 mb-24 sm:mb-6">
        <div>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r ${
              currentPage <= 1 ? "cursor-not-allowed" : ""
            }`}
            onClick={onPrevClick}
            disabled={currentPage <= 1}
          >
            Prev
          </button>
        </div>
        <div>
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 sm:mx-2 rounded-r ${
                currentPage === page ? "cursor-not-allowed" : ""
              }`}
              onClick={() => onPageClick(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}
        </div>
        <div>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r ${
              currentPage >= totalPage
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={onNextClick}
            disabled={currentPage >= totalPage}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default BottomButtons
