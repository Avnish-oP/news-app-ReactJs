import React, { Component } from "react";
import NewsCard from "./NewsItem";
import { PulseLoader } from "react-spinners";
import BottomButtons from "./bottomButtons";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalPage: 1,
    };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      let data = await fetch(
        `https://newsapi.org/v2/everything?q=india&apiKey=5f243c25cf8d41bda631796791d1d619&page=${this.state.page}`
      );

      let parsedData = await data.json();
      const filteredData = parsedData.articles.filter(
        (article) => article.urlToImage
      ); // Filtering out articles with no image
      this.setState({
        articles: filteredData,
        loading: false,
        totalPage: Math.ceil(filteredData.length / 20),
      });
      console.log(this.state.totalPage);
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  handlePrevClick = () => {
    this.setState({ page: this.state.page - 1 });
    this.componentDidMount();
  };
  handleNextClick = () => {
    console.log(this.state.page);
    this.setState({ page: this.state.page + 1 }, () => {
      this.componentDidMount();
    });
  };
  handlePageClick = (page) => {
    this.setState({ page });
    this.componentDidMount();
  };

  render() {
    const { articles, loading, page, totalPage } = this.state;
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#000" />
        </div>
      );
    }
    if (articles.length === 0) {
      return <h1 className="text-3xl font-bold mx-auto">No News Available</h1>;
    }

    return (
      <>
        <div className="flex justify-center text-2xl sm:text-4xl font-bold my-4">
          <h1 className="mx-auto">Today's Top HeadLines</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 overflow-x-hidden">
          {articles
            .slice((this.state.page - 1) * 20, this.state.page * 20)
            .map((news) => (
              <NewsCard
                key={news.url}
                image={news.urlToImage}
                title={news.title}
                description={news.description}
                url={news.url}
              />
            ))}
        </div>
       <BottomButtons currentPage={page} totalPage={totalPage} onPrevClick={this.handlePrevClick} onPageClick={this.handlePageClick} onNextClick={this.handleNextClick} />
      </>
    );
  }
}

export default News;
