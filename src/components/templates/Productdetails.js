import React from 'react';
import PropTypes from 'prop-types';
import {deleteProduct} from '../redux/actions/action_product_crud';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

function Productdetails(props) {
  return(
      <tr>
        <td>{props.product.name}</td>
        <td>{props.product.description}</td>
        <td>{props.product.price}</td>
        <td>{props.product.unit_of_measurement}</td>
        <td><Link to={`/api/product/edit/${props.product._id}`}><button type="button" className="btn btn-info">Edit</button></Link></td>
        <td><button type="button" className="btn btn-danger" onClick={()=> props.deleteProduct(props.product._id)}>Delete</button></td>
      </tr>
  )
};

Productdetails.propTypes ={
  product: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch)=>{
return {
  deleteProduct:  (_id) => dispatch(deleteProduct(_id)),
 }
}

export default connect(null, mapDispatchToProps)(Productdetails);
