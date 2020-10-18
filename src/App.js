import React, { Component } from 'react';
import './App.css';
import { BrowserRouter , Route } from 'react-router-dom';
import Home from './components/templates/home';

import Productindex from './components/templates/productindex';
import AddProduct from './components/templates/productAdd';
import EditProduct from './components/templates/editProduct';

import TopNavigationBar from './components/templates/TopNavigationbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter >
         <div className="container-fluid">
           <div>
              <TopNavigationBar/>
           </div>
            <div>
              <Route exact path="/" component={Home}/>

              <Route path="/products" component={Productindex}/>
              <Route path="/productadd" component={AddProduct}/>
              <Route path="/api/product/edit/:_id" render={(props)=> (
                 <EditProduct  {...props}/>
              )}/>
            </div>
         </div>
        </BrowserRouter>
    );
  }
}

export default App;
