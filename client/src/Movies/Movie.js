import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { NavLink } from 'react-router-dom';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id;
    this.fetchMovie(id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }

  removeMovie = () => {
    const removeFromList = this.props.removeFromList;
    removeFromList(this.state.movie)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    const movie = this.state.movie;
    return (
      <div className="save-wrapper">
        <NavLink to={'/movies/:id'}>
          <MovieCard movie={movie}saveMovie={this.saveMovie} />
        </NavLink>
        <div onClick={this.saveMovie} className="save-button">Save</div>
        <div onClick={this.removeMovie} className="remove-button">Remove</div>
      </div>
    );
  }
}
