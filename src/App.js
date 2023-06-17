import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { React, Component} from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="general" key="general" />} />
            <Route exact path="/general" key="general" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={6} country="in" category="general" />} />
            <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={6} country="in" category="business" key="business" />} />
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={6} country="in" category="entertainment" key="entertainment" />} />
            <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={6} country="in" category="health" key="health" />} />
            <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={6} country="in" category="science" key="science" />} />
            <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={6} country="in" category="sports" key="sports" />} />
            <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={6} country="in" category="technology" key="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}