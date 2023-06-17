import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner2 from './Spinner2';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `NewsIndia - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let response = await fetch(url);
    this.props.setProgress(30);
    let data = await response.json();
    this.props.setProgress(60);
    console.log(data);
    this.setState({
      loading: false,
      articles: data.articles,
      totalResults: data.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    })
  };

  render() {
    return (
      <>
        <div className="container" style={{ "marginTop": "80px" }}>
          <h1 className='text-center' style={{
            "marginTop": "15px",
            "marginBottom": "10px"
          }}>News India - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        </div>
        {this.state.loading && <Spinner />}
          {/* this is for infinite scroll */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner2 />}
          >
            <div className="container">

              <div className="row">
                {this.state.articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2bDQXiO5_y_5b6nGohqOM2IlmrfNjsXVtz-IW8vsOLyo_p6K0LzjkcY1KYKIqpRyDqc&usqp=CAU"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
          {//this is for prev next pagination
          /* <div className="row">
            {!this.state.loading &&
              this.state.articles.map((ele) => {
                return (
                  <div className="col-md-4" key={ele.url}>
                    <NewsItem title={ele.title} description={ele.description} imgUrl={ele.urlToImage ? ele.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2bDQXiO5_y_5b6nGohqOM2IlmrfNjsXVtz-IW8vsOLyo_p6K0LzjkcY1KYKIqpRyDqc&usqp=CAU"} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                  </div>
                );
              })
            }
          </div> */}
          {//this is for prev next pagination this work completely fine
          /* <div className="container d-flex justify-content-between my-2">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
  }
}
