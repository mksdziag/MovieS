import React, { Component } from "react";
import axios from "axios";

import "./Trending.css";

import { popularUrl } from "../../assets/apiConfig";
import movieRatingColorize from "../../assets/movieRatingColorize";
import SectionTitle from "../UiElements/SectionTitle";
import TrendingItem from "./TrendingItem";

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingNow: [],
    };
  }

  componentDidMount() {
    axios
      .get(popularUrl)
      .then(response => {
        const trendingNow = response.data.results;
        this.setState({ trendingNow });
      })
      .catch(err => console.log(err));
  }

  render() {
    const trendingMovies = this.state.trendingNow.map(movie => {
      const { id, vote_average } = movie;
      const noteBackground = movieRatingColorize(vote_average);
      return <TrendingItem key={id} {...movie} noteBackground={noteBackground} />;
    });
    return (
      <div className="trending">
        <SectionTitle title="Trending in the World" />
        <ul className="trending__list">{trendingMovies}</ul>
      </div>
    );
  }
}

export default Trending;
