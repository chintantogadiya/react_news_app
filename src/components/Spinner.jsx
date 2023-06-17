import React, { Component } from 'react'
import loading from '../images/loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='d-flex align-items-center justify-content-center' style={{"height":"60vh"}}>
        <img src={loading} alt="loading" />
      </div>
      
    )
  }
}
