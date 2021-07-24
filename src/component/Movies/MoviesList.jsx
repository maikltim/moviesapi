import React from "react";
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3 } from "../../api/api";
import _ from "lodash";
import queryString from "query-string";


export default class MoviesList extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.onChangePagination({
          page: data.page,
          total_pages: data.total_pages
        });
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page)
  }
 

  

  componentDidUpdate(prevProps) {
    if (
      !_.isEqual(this.props.filters, prevProps.filters)
    ) {
      this.props.onChangePagination({ page: 1 });
      this.getMovies(this.props.filters, 1);
    }
  }



  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}