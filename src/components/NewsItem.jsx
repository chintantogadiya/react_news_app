import React, { Component } from 'react'
import '../css/newsItem.css';

export default class NewsItem extends Component {
  render() {
    return (
        <>
        <div className="m-2">
          <div className="card">
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
            }
            }>

              <span className="badge rounded-pill bg-danger"> {this.props.source} </span>
            </div>
            <img src={this.props.imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
              <h5 className="card-title">{this.props.title}</h5>
              <p className="card-text"><small className="text-muted">By {!this.props.author ? "Unknown" : this.props.author} on  {new Date(this.props.date).toGMTString()}</small></p>
                        <a href={this.props.url} target="_blenk" className="btn btn-dark">Read more</a>
                    </div>
                </div>
        </div>
      </>
    )
  }
}
