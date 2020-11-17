import React, {useEffect, useState} from 'react'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TitleSearch from './pages/TitleSearch'
import TitleResults from './pages/TitleResults'
import TagSearch from './pages/TagSearch'
import TagResults from './pages/TagResults'
import Details from './pages/Details'
import Ranking from './pages/Ranking'
import BookRequest from './pages/BookRequest'
import AdminPanel from './pages/AdminPanel'
import ApproveBooks from './pages/ApproveBooks'
import EditBook from './pages/EditBook'
import ApproveTags from './pages/ApproveTags'
import NotFound from './pages/NotFound'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

function App() {

  return (
      <div>
        <Router>
          <Navigation isLogged={false} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/title" component={TitleSearch} />
            <PrivateRoute path="/title_results/:q" component={TitleResults} />
            <PrivateRoute exact path="/tag" component={TagSearch} />
            <PrivateRoute path="/tag_results" component={TagResults} /> 
            <PrivateRoute path="/details/:isbn" component={Details} />
            <PrivateRoute path="/ranking" component={Ranking} />
            <PrivateRoute path="/book_request" component={BookRequest} />
            <AdminRoute exact path="/admin" component={AdminPanel}/>
            <AdminRoute exact path="/admin/approve_books" component={ApproveBooks} />
            <AdminRoute path="/admin/edit_book" component={EditBook} />
            <AdminRoute exact path="/admin/approve_tags" component={ApproveTags} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
