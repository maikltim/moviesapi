import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";
import {actionCreatorUpdateAuth, actionCreatorLogOut, fetchAuth} from '../redux/auth/auth.actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const cookies = new Cookies();

export const AppContext = React.createContext();
class App extends React.Component {

  // updateAuth = (user, session_id) => {
  //   this.props.store.dispatch(actionCreatorUpdateAuth({
  //     user,
  //     session_id
  //   }))
  // };

  // onLogOut = () => {
  //   this.props.store.dispatch(actionCreatorLogOut())
  // };

  componentDidMount() {
    const { session_id, fetchAuth } = this.props;
    if (session_id) {
      fetchAuth(session_id)
    }
  }

  render() {
    console.log(this.props)
   const { user, session_id, isAuth, updateAuth, onLogOut } = this.props;
    return isAuth || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            onLogOut,
            updateAuth
          }}
        >
          <div>
            <Header user={user} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/account/favorites" component={AccountFavorites} />
            {/*
              "/" - MoviesPage
              "/movie/1" - Movie with id = 1
            */}
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
        <p>...Loading</p>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    session_id: state.session_id,
    isAuth: state.isAuth
  }
}


const mapDispatchToProps = (dispatch) => {
  return { 
    updateAuth: bindActionCreators(actionCreatorUpdateAuth, dispatch),
    onLogOut: bindActionCreators(actionCreatorLogOut, dispatch),
    fetchAuth
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)