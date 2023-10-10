import React, { Component } from "react";
import NewsCard from "./NewsItem";
import { PulseLoader } from "react-spinners";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  componentDidMount() {
    this.updateNews();
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - NewsMonkey`;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ articles: [], page: 1 }, () => {
        this.updateNews();
      });
    }
  }

  updateNews = async () => {
    try {
      this.setState({ loading: true });
      this.props.setProgress(10);

      const { country, category, apiKey } = this.props;
      const { page } = this.state;

      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
      );

      this.props.setProgress(30);

      let parsedData = await data.json();
      const { articles } = parsedData;

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...articles],
        loading: false,
      }));

      this.props.setProgress(100);
    } catch (e) {
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  };

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        () => {
          this.updateNews();
        }
      );
    }, 1500);
  };

  render() {
    const { articles, loading } = this.state;
    const { category, pageSize } = this.props;

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
              : `${
                  category.charAt(0).toUpperCase() + category.slice(1)
                } - News`}{" "}
          </h1>
        </div>
        <InfiniteScroll
          dataLength={articles.length} // This is important field to render the next data
          next={this.fetchMoreData}
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
  }
}

export default News;
