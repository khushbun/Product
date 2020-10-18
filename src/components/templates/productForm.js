import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props && this.props.product ? this.props.product:{name:'', description:'', price:'', unit_of_measurement:'', product_image:''},
      file:'',
      file_image:''
    }

    if(this.state.product.product_image && this.state.product.product_image.length) {
      this.setState({ file:  require(`../../../uploads/${this.state.product.product_image}`)});
    }
  }

  handleChange = (e)=>{
    if(e.target.name == 'name') {
      let product = {...this.state.product};
      product.name = e.target.value;
      this.setState({ product:product })
    }

    if(e.target.name == 'description') {
      let product = {...this.state.product};
      product.description = e.target.value;
      this.setState({ product:product })
    }

    if(e.target.name == 'price') {
      let product = {...this.state.product};
      product.price = e.target.value;
      this.setState({ product:product })
    }

    if(e.target.name == 'unit_of_measurement') {
      let product = {...this.state.product};
      product.unit_of_measurement = e.target.value;
      this.setState({ product:product })
    }

    if(e.target.name == 'product_image'){
      let supportedFormats = ['image/jpg','image/gif','image/png'];

      if (e.target.files[0] && e.target.files[0].type) {
        if (0 > supportedFormats.indexOf(e.target.files[0].type)) {
            e.target.value = "";
            alert('unsupported format');
        } else {
          this.setState({file_image: e.target.files[0]})
          this.setState({file: URL.createObjectURL(e.target.files[0])})
        }
      } 
    }
  }

  onSubmit = (e)=>{
    e.preventDefault();
    let product = {...this.state.product};
    product.product_image = this.state.file_image;

    this.props.handleSubmit(product);
  }

  componentWillReceiveProps(nextprops, currprops) {
    if (nextprops.product !== currprops.product) {
      this.setState({ product: nextprops.product });
      if(nextprops.product.product_image && nextprops.product.product_image.length) {
        this.setState({ file:  require(`../../../uploads/${nextprops.product.product_image}`)});
      }
    }
  }

  render() {
    return (
      <div className="container">
       <form  onSubmit={this.onSubmit} enctype="multipart/form-data">
           <div className="form-group">
              <label>Name	:</label>
              <input
              value={this.state.product.name}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter name" required/>
            </div>
          <div className="form-group">
              <label>Description :</label>
              <input
              value={this.state.product.description}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter description" required/>
          </div>
          <div className="form-group">
              <label >Price	:</label>
              <input
              value={this.state.product.price}
              onChange={this.handleChange}
              type="number"
              className="form-control"
              name="price"
              placeholder="Enter price" required/>
           </div>
           <div className="form-group">
              <label>Unit of measurement :</label>
              <input
              value={this.state.product.unit_of_measurement}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              name="unit_of_measurement"
              placeholder="Enter Unit of measurement" required/>
          </div>
          <div className="form-group">
              <label>Product Image :</label>
              <input
              onChange={this.handleChange}
              ref="file"
              type="file"
              accept="image/*"
              className="form-control"
              name="product_image" required = {this.state.file == '' ? true : false}/>

              <img src={this.state.file}/>
          </div>
          <div className="form-group">
            <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
          </div>

        </form>
        </div>
    );
  }

}

ProductForm.contextTypes ={
  router:PropTypes.object.isRequired
}

export default withRouter(ProductForm);
