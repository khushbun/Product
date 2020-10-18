import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Productlist  from './Productlist';
import {fetchProduct} from '../redux/actions/action_product_crud';

class Productindex extends Component {

  componentDidMount(){
    this.props.fetchProduct();
  }
  render() {
    const {products} = this.props;
    return (
      <div className="container-fluid">
       <h2>Product</h2>
       <Productlist products={products} />
      </div>
    );
  }

}


Productindex.propTypes={
  products:PropTypes.array.isRequired,
  fetchProduct:PropTypes.func.isRequired
}

const mapStateToProps = state=>{
  return {
    products: state.product.products
  }
};

export default connect(mapStateToProps,{fetchProduct})(Productindex);
