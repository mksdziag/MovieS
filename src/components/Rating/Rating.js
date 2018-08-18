import React from 'react';

import './Rating.css';

const Rating = ({ userRatingHandler }) => {
  return (
    <select onChange={e => userRatingHandler(e)} className="btn btn--select">
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
