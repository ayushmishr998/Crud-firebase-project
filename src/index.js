import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import EditProducts from './components/EditProducts';
import ShowProducts from './components/ShowProducts';
import {BrowserRouter,Route} from 'react-router-dom';	
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/AddProduct';

ReactDOM.render(
	<BrowserRouter>
	<Route exact path="/" component={App}></Route>
	<Route  path="/create" component={AddProduct}></Route>
	<Route  path="/show/:id" component={ShowProducts}></Route>
	<Route  path="/edit/:id" component={EditProducts}></Route>
	</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
