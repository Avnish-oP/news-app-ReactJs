import React, { useEffect, useState, useCallback } from "react";
import NewsCard from "./NewsItem";
import { PulseLoader } from "react-spinners";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const useNews = (country, category, apiKey, pageSize, setProgress) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async (page) => {
    try {
      setLoading(true);
      setProgress(10);

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
      );

      setProgress(30);

      const data = await response.json();
      if (data.articles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      }

      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setProgress(100);
    }
  }, [country, category, apiKey, pageSize, setProgress]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchNews(1);
  }, [category, country, fetchNews]);

  return { articles, loading, hasMore, setPage, fetchNews };
};

const News = ({ country, pageSize, category, apiKey, setProgress }) => {
  const { articles, loading, hasMore, setPage, fetchNews } = useNews(
    country,
    category,
    apiKey,
    pageSize,
    setProgress
  );

  const fetchMoreData = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchNews(nextPage);
      return nextPage;
    });
  };

  useEffect(() => {
    document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - NewsMonkey`;
  }, [category]);

  if (loading && articles.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader />
      </div>
    );
  }

  if (articles.length === 0) {
    return <h1 className="text-3xl font-bold mx-auto">No News Available</h1>;
  }

  return (
    <>
      <div className="flex justify-center text-2xl sm:text-4xl font-bold my-4">
        <h1 className="mx-auto">
          Today's{" "}
          {category === "general"
            ? "Top Headlines"
            : `${category.charAt(0).toUpperCase() + category.slice(1)} - News`}
        </h1>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center self-center">
            <PulseLoader />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>
              {category === "general"
                ? "Top Headlines"
                : `${category.charAt(0).toUpperCase() + category.slice(1)} - News`}{" "}
              Ends Here
            </b>
          </p>
        }
      >
        <div className="flex flex-wrap justify-center gap-4 overflow-x-hidden">
          {articles.map((news, index) => (
            <NewsCard
              key={index}
              image={news.urlToImage}
              title={news.title}
              description={news.description}
              url={news.url}
              author={news.author}
              date={news.publishedAt}
              source={news.source.name}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
