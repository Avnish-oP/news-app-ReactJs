import React, { Component } from 'react';
import NewsCard from './NewsItem';
import { BeatLoader, CircleLoader, ClipLoader, MoonLoader, PulseLoader } from 'react-spinners';

export class News extends Component {
  

constructor(){
    super();
    this.state = {
      articles: [],
      loading: false
    };
  }
  componentDidMount() {
    this.setState({loading: true});
    setTimeout(() => {
      fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=5f243c25cf8d41bda631796791d1d619')
        .then(Response => Response.json())
        .then(data => this.setState({articles: data.articles, loading: false}))
        .catch(error => console.log(error));
      
    }, 1000);
  }
  render() {
    const {articles, loading} = this.state;
    if (loading) {
      return (
        <div className='flex justify-center items-center h-screen'>
          <PulseLoader color='#000' />
        </div>
      );
    }
    if(articles.length === 0){
      return <h1 className='text-3xl font-bold mx-auto'>No News Available</h1>
    }

    return (
      <>
      <h1 className=' text-3xl font-bold mx-auto'>Top HeadLines</h1>
      <div className='flex flex-wrap justify-center gap-4 overflow-x-hidden'>
        {articles.map((news) => ( 
          <NewsCard
          key={news.url}
          image={news.urlToImage}
          title={news.title}
          description={news.description}
          url={news.url}
        />
        ))}
      </div>
      </>
    )
  }
}

export default News
