import React, { Component } from "react";
import NewsCard from "./NewsItem";
import { PulseLoader } from "react-spinners";
import BottomButtons from "./bottomButtons";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
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
      totalResults: 0,
      category: this.props.category,
    };
  }
  updateNews = async () => {
    try {
      this.setState({ loading: true, category: this.props.category });
      this.props.setProgress(10);
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=20`
      );
      this.props.setProgress(30);
      let parsedData = await data.json();
      const filteredData = parsedData.articles.filter(
        (article) => article.urlToImage
      ); // Filtering out articles with no image
      this.setState({
        articles: filteredData,
        loading: false,
        totalResults: parsedData.totalResults,
      });
      this.props.setProgress(100);
      console.log(parsedData.totalResults);
    } catch (e) {
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  };

  async componentDidMount() {
    this.updateNews();

    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - NewsMonkey`;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.componentDidMount();
    }
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    try {
      this.props.setProgress(10);
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5f243c25cf8d41bda631796791d1d619&page=${this.state.page}&pageSize=20`
      );
      this.props.setProgress(30);
      let parsedData = await data.json();
      const filteredData = parsedData.articles.filter(
        (article) => article.urlToImage
      ); // Filtering out articles with no image
      this.setState({
        articles: this.state.articles.concat(filteredData),
        loading: false,
        totalResults: parsedData.totalResults,
      });
      this.props.setProgress(100);
      console.log(parsedData.totalResults);
    } catch (e) {
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  };
  fetchdata=()=>{
    setTimeout(() => {
      this.fetchMoreData();
    }, 500);
  }

  render() {
    const { articles, loading, page, totalPage } = this.state;
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
            {this.props.category === "general"
              ? "Top Headlines"
              : `${
                  this.props.category.charAt(0).toUpperCase() +
                  this.props.category.slice(1)
                } - News`}{" "}
          </h1>
        </div>
        <InfiniteScroll
          dataLength={this.state.totalResults} //This is important field to render the next data
          next={this.fetchdata}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<div className="flex justify-center self-center"><PulseLoader/></div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>{this.props.category === "general"
              ? "Top Headlines"
              : `${
                  this.props.category.charAt(0).toUpperCase() +
                  this.props.category.slice(1)
                } - News`} Ends Here</b>
            </p>
          }
        >
          <div className="flex flex-wrap justify-center gap-4 overflow-x-hidden">
            {articles.map((news) => (
              <NewsCard
                key={news.url}
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
