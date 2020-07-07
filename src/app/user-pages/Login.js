import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Form } from 'react-bootstrap';
import ReactDOM from "react-dom";
import App from '../../app/App';
import axios from "../axios/API";
import * as Swal from "sweetalert2";

export class Login extends Component {
  handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    axios({
      method: 'post',
      url: '/login',
      data: data,
    }).then(function (response) {
        if (response.data.status===1){
          // console.log(response.data.status)
          Swal.fire(
              'Login Berhasil',
              'Anda sedang login sebagai '+response.data.role_name,
              'success'
          ).then(result => {window.location.replace("/dashboard")})
          localStorage.setItem("loginStatus", true);
          localStorage.setItem("fullName", response.data.fullname);
          localStorage.setItem("roleName", response.data.role_name);
          localStorage.setItem("phone", response.data.phone);
          localStorage.setItem("email", response.data.email);
          ReactDOM.render(
              <BrowserRouter>
                <App />
              </BrowserRouter>
              , document.getElementById('root'));
        } else {
          Swal.fire(
              'Error',
              response.data.message,
              'error'
          )
          return false
        }
      })
      .catch(err => {
        // console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto my-5">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5 text-center">
                <div className="brand-logo">
                  {/*<img src={require("../../assets/images/logo.svg")} alt="logo" />*/}
                  <h4>POINTER COVIDTEST DASHBOARD</h4>
                </div>
                <h5>Selamat datang!</h5>
                <h6 className="font-weight-light">Login terlebih dahulu.</h6>
                <Form className="pt-3" onSubmit={this.handleLogin}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" name="email" placeholder="Username" size="lg" className="h-auto" required />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" name="password" placeholder="Password" size="lg" className="h-auto" required />
                  </Form.Group>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">LOGIN</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login
