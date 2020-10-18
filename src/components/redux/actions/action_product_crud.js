import axios from 'axios';
import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from './actionType';

export function fetchProduct() {
  return dispatch =>{
      axios.get('/api/product')
      .then( (response)=> {        
        dispatch({
          type:FETCH_PRODUCT_SUCCESS,
          products:response.data
        })

      })
      .catch((error)=> {
        console.log(error);
      });

  }
}

export function addProduct(data) {
  return dispatch => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("price", data.price);
    bodyFormData.append("unit_of_measurement", data.unit_of_measurement);
    bodyFormData.append("product_image", data.product_image);
    
  axios({
    method: 'post',
    url: '/api/product/add',
    data: bodyFormData,
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      }
    })
    .then(response =>{
      dispatch({
        type: ADD_PRODUCT,
        product:response.data
      });
    })

  }
}

export function editProduct(_id) {
  return dispatch => {
   axios.get(`/api/product/edit/${_id}`)
    .then(response =>{
      dispatch({
        type: EDIT_PRODUCT,
        product:response.data
      });
    })

  }
}

export function updateProduct(_id, data) {
  return dispatch => {
  var bodyFormData = new FormData();
  bodyFormData.append("name", data.name);
  bodyFormData.append("description", data.description);
  bodyFormData.append("price", data.price);
  bodyFormData.append("unit_of_measurement", data.unit_of_measurement);
  bodyFormData.append("product_image", data.product_image);

  axios({
    method: 'post',
    url: `/api/product/update/${_id}`,
    data: bodyFormData,
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      }
    })
    .then(response =>{
      dispatch({
        type: UPDATE_PRODUCT,
        product:response.data
      });
    })

  }
}

export function deleteProduct(_id) {
  return dispatch => {
   axios.get(`/api/product/delete/${_id}`)
    .then(response =>{
      dispatch({
        type: DELETE_PRODUCT,
        id:_id,
      })
    })
  }
}
