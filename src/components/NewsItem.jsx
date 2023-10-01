import React, { Component } from 'react';

class NewsCard extends Component {
  render() {
    const { image, title, description, url } = this.props;

    return (
      <div className="rounded max-w-md w-full shadow-lg overflow-hidden shadow-black mx-2 sm:m-0 mt-2">
        <img className="sm:h-[40vh]" src={image} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p  className="text-gray-700 text-base line-clamp-2 hover:line-clamp-none transition-all">{description}</p>
        </div>
        <div className="px-6 py-4">
          <a href={url} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsCard;