import React, { Component } from "react";
import defaultImage from "../assets/defaultImage.jpg";

class NewsCard extends Component {
  render() {
    const { image, title, description, url, author, date, source } = this.props;
    let dateObj = new Date(date);
    let dateStr = dateObj.toDateString();

    return (
      <div className="rounded max-w-md w-full border-gray-400 border-2 shadow-sm overflow-hidden shadow-gray-700 mx-2 sm:m-0 mt-2">
        <div className="relative">
          <img
            className="max-h-[35vh] min-w-full  overflow-hidden"
            src={image || defaultImage}
            alt={title}
          />
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 text-xs font-bold">
            {source}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base line-clamp-2 hover:line-clamp-none transition-all duration-500">
            {description}
          </p>{" "}
          <p className="mt-6">
            By {author} On {dateObj.toUTCString()}
          </p>
        </div>

        <div className="px-6 py-4">
          <a
            href={url}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsCard;
