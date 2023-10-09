import React, { Component } from "react";
import NewsCard from "./NewsItem";
import { PulseLoader } from "react-spinners";
import BottomButtons from "./bottomButtons";
import PropTypes from 'prop-types';
import Navbar from "./Navbar";


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
      loading: false,
      page: 1,
      totalPage: 1,
      category: this.props.category,
    };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true , category: this.props.category});
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5f243c25cf8d41bda631796791d1d619&page=${this.state.page}&pageSize=20`
      );

      let parsedData = await data.json();
      const filteredData = parsedData.articles.filter(
        (article) => article.urlToImage
      ); // Filtering out articles with no image
      this.setState({
        articles: filteredData,
        loading: false,
        totalPage: (parsedData.totalResults / 20).toFixed(0),
      });
    } catch (e) {
      this.setState({ loading: false });
    }
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.componentDidMount();
    }
  }

  handlePrevClick = () => {
    this.setState({ page: this.state.page - 1 });
    this.componentDidMount();
  };
  handleNextClick = () => {
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
          <h1 className="mx-auto">Today's {this.props.category==='general'?'Top Headlines':`${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - News`} </h1>
        </div>
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
       <BottomButtons currentPage={page} totalPage={totalPage} onPrevClick={this.handlePrevClick} onPageClick={this.handlePageClick} onNextClick={this.handleNextClick} />
      </>
    );
  }
}

export default News;
