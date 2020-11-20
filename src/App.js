import React, { useState, useEffect } from 'react';
import LoginPage from 'pages/login';
import MainPage from 'pages/main';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { firebase } from 'services';
import { authActions } from 'store/actions';


const App = (props) => {
  const { user } = props
  const [loading, setLoading] = useState()
  const history = useHistory()

  useEffect(() => {
    if (user) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase.auth().signInWithCustomToken(user.token)
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              props.logout()
              history.replace('/')
            })
        })
    } else setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  return (
    <>
      {
        loading ? <div className='relh100vh flex col jcc aic'>Chargement de l'application...</div>
          : <Switch>
            <Route exact path="/">
              {user ? <Redirect to="/dashboard" />
                : <Redirect to="/login" />
              }
            </Route>
            {!user && <Route to="/login" component={LoginPage} />}
            <MainPage />
          </Switch>
      }
    </>
  )
}
const mapState = (state) => ({
  user: state.auth.user
})

const actionCreators = {
  logout: authActions.logout
}

export default connect(mapState, actionCreators)(App);


