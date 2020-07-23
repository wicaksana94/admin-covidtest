import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../config/API";
import * as Swal from "sweetalert2";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city_list:[],
            vendor_list:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCity() {
        axios.request({
            method: 'GET',
            url: '/getCity',
            responseType: 'json'
        }).then(response => this.setState({
            city_list:response.data
        }))
    }

    getVendor() {
        axios.request({
            method: 'GET',
            url: '/getVendor',
            responseType: 'json'
        }).then(response => this.setState({
            vendor_list:response.data
        }))
    }

    addProduct() {
        alert('test')
    }

    componentDidMount() {
        this.getCity()
        this.getVendor()
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        axios({
            method: 'post',
            url: '/postAddProduct',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data produk telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/product")})
                } else {
                    Swal.fire(
                        'Error',
                        response.data,
                        'error'
                    )
                }
            })
            .catch(err => {
                // console.log(err);
                Swal.fire(
                    'Error',
                    'Error, cobalah beberapa saat lagi',
                    'error'
                )
            });
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">Add Product</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {/*<li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>*/}
                            {/*<li className="breadcrumb-item active" aria-current="page">Basic tables</li>*/}
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="id">ID</label>
                                        <input placeholder="Isi ID disini" type="text" id="id" name="id" className="form-control form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama</label>
                                        <input placeholder="Isi nama disini" type="text" id="name" name="name" className="form-control form-control-lg"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vendor">Vendor</label>
                                        <Form.Control as="select" name="id_vendor">
                                            {this.state.vendor_list.map(vendor_list => (
                                                <option id={vendor_list.id} key={vendor_list.id} value={vendor_list.id}>{vendor_list.name}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProduct;