import React, { Component } from 'react';
import defaultImage from '../assets/defaultImage.jpg';

class NewsCard extends Component {
  render() {
    const { image, title, description, url } = this.props;

    return (
      <div className="rounded max-w-md w-full border-gray-400 border-2 shadow-sm overflow-hidden shadow-gray-700 mx-2 sm:m-0 mt-2">
        <img className="h-[40vh]  overflow-hidden" src={image||defaultImage} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p  className="text-gray-700 text-base line-clamp-2 hover:line-clamp-none transition-all duration-500">{description}</p>
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