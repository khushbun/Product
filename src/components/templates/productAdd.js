import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductForm from './productForm';
import {addProduct} from '../redux/actions/action_product_crud';

class ProductAdd extends Component {
  constructor(props){
    super(props);

    this.state = {
    name: '',
    description: '',
    price: 0,
    unit_of_measurement:''
   };

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  render() {
    const handleSubmit = async (values) => {
      await this.props.addProduct(values);
      this.props.history.push('/products');
    };

    return (
      <div>
          <ProductForm{...this.props} {...this.state}
            handleSubmit = {handleSubmit}
           />
      </div>
    );
  }

}

ProductAdd.propTypes = {
  addProduct:PropTypes.func.isRequired
}

export default connect(null, {addProduct})(ProductAdd) ;
