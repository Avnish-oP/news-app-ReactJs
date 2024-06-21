import React, { Component } from "react";
import PropTypes from "prop-types";
import defaultImage from "../assets/defaultImage.jpg";

class NewsCard extends Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string,
    date: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  };

  render() {
    const { image, title, description, url, author, date, source } = this.props;
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString();

    return (
      <div className="max-w-md w-full border rounded-lg overflow-hidden shadow-lg mx-2 sm:mx-4 my-4 bg-white">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
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
          </p>
          <p className="mt-4 text-gray-500 text-sm">
            By {author || "Unknown"} on {formattedDate}
          </p>
        </div>
        <div className="px-6 py-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsCard;
