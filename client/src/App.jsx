import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import ItemList from "./components/ItemList";
import ItemModal from "./components/ItemModal";
import { loadUser } from "./actions/authActions";

class App extends Component {
  state = {};
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ItemList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
