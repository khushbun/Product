import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Productdetails from './Productdetails';

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
    return (
      <div>
      {products.length=== 0 ? emptyProductlist:productinfo}
      </div>
    );

}

Productlist.propTypes={
    products:PropTypes.array.isRequired
}
export default Productlist;
