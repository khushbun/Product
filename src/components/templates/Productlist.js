import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Productdetails from './Productdetails';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import {deleteProduct} from '../redux/actions/action_product_crud';
import {connect} from 'react-redux';

const Productlist = (props) => {
  const emptyProductlist = (<p> Still there are no products information </p>);

    const { products } = props;
    const productinfo = (
      <div className="">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Pice</th>
              <th>Unit of measurement</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              product => <Productdetails product={product} key={product._id}/>
            )}
          </tbody>
        </table>
      </div>
    );
    
    const columns = [
      {
        dataField: 'name',
        text: 'Name'
      },
      {
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'description',
        text: 'Description'
      }, {
        dataField: 'price',
        text: 'Price'
      }, {
        dataField: 'unit_of_measurement',
        text: 'Unit of measurement'
      }, {
        text: 'Edit',
        dataField: 'id',
        formatter: editFormatter
      }, {
        text: 'Delete',
        dataField: 'id',
        formatter: deleteFormatter
      }
    ];
    
    function editFormatter(cell, row, rowIndex, formatExtraData) {
      return ( 
        <Link to={`/api/product/edit/${row._id}`}><button type="button" className="btn btn-info">Edit</button></Link>
    ); } 
    
    function deleteFormatter(cell, row, rowIndex, formatExtraData) {
      return ( 
        <button type="button" className="btn btn-danger" onClick={()=> props.deleteProduct(row._id)}>Delete</button>
    ); } 

    return (
      products.length===0 ? emptyProductlist: (
      <div>
        <BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } />
      </div>)
    );

}

Productlist.propTypes ={
  product: PropTypes.object.isRequired,
  products:PropTypes.array.isRequired
}

const mapDispatchToProps = (dispatch)=>{
return {
  deleteProduct:  (_id) => dispatch(deleteProduct(_id)),
 }
}

export default connect(null, mapDispatchToProps)(Productlist);
