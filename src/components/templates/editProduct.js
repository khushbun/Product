import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductForm from './productForm';
import { editProduct, updateProduct } from '../redux/actions/action_product_crud';

class EditProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      price: 0,
      unit_of_measurement:'',
      product_image:'',
   };
  }
  
componentDidMount(){
  const {product, match} = this.props;
  this.props.editProduct(match.params._id);

  if (product) {
    this.setState({
      name: product.name,
      description: product.description,
      price: product.price,
      unit_of_measurement: product.unit_of_measurement,
      product_image: product.product_image
    });
  }
}

  render() {
    const handleSubmit = async (values) => {
      await this.props.updateProduct(this.props.match.params._id, values);
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

EditProduct.propTypes = {
  products:PropTypes.array.isRequired,
  editProduct:PropTypes.func.isRequired,
  updateProduct:PropTypes.func.isRequired
}

const mapStateToProps = state=>{
  return {
    product: state.product.product
  }
};

const mapDispatchToProps = dispatch =>{
  return {
    editProduct: (value)=> dispatch(editProduct(value)),
    updateProduct: (value1, value2)=> dispatch(updateProduct(value1, value2))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct) ;
