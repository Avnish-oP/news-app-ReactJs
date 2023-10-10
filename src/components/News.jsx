import React, { useEffect, useState } from "react";
import NewsCard from "./NewsItem";
import { PulseLoader } from "react-spinners";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const {
    country ,
    pageSize ,
    category,
    apiKey,
    setProgress,
  } = props;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [categoryName, setCategoryName] = useState("general");

  useEffect(() => {
    console.log(articles);
    updateNews();
    document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - NewsMonkey`;
  }, [category]);

  const updateNews = async () => {
    try {
      setLoading(true);
      setProgress(10);

      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
      );

      setProgress(30);

      let parsedData = await data.json();
      // const { articles: newArticles } = parsedData;

      // setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setArticles(parsedData.articles);
      setLoading(false);

      setProgress(100);
    } catch (e) {
      setLoading(false);
      setProgress(100);
    }
  };
  const fetchData = async() => {
    setProgress(10);

      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
      );

      setProgress(30);

      let parsedData = await data.json();
      const { articles: newArticles } = parsedData;

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setLoading(false);

      setProgress(100);
  }
    

  const fetchMoreData = () => {
    setCategoryName(category);
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      fetchData();
    }, 1500);
  };

  if (loading) {
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
            : `${category.charAt(0).toUpperCase() + category.slice(1)} - News`}{" "}
        </h1>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length % pageSize === 0}
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
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
