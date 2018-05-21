import React from "react";
import "./Rating.css";

const Rating = props => {
  return (
    <select
      onChange={e => props.userRatingHandler(e)}
      className="movie-rating__select"
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </select>
  );
};

export default Rating;
