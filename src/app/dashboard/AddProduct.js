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

    getVendorData() {
        let url;
        if(localStorage.getItem("vendorID") === null){
            url = '/getAllVendor';
        } else {
            url = '/getVendor';
        }
        axios.request({
            method: 'GET',
            url: url,
            responseType: 'json'
        }).then(response => this.setState({
            vendor_list:response.data
        }))
    }

    componentDidMount() {
        this.getCity()
        this.getVendorData()
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
                if (response.data.code===201){
                    Swal.fire(
                        'Data tersimpan',
                        'Data produk telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/product")})
                } else if (response.data.code){
                    Swal.fire(
                        'Error',
                        response.data.message,
                        'error'
                    )
                } else {
                    Swal.fire(
                        'Error',
                        'Error unknown',
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

    onChangeOption(e){
        document.getElementById("id")[0].setAttribute("disabled","1");
        if (e.target.value === "RAPID"){
            document.getElementById("name").value = "Rapid";
        } else if (e.target.value === "SWAB"){
            document.getElementById("name").value = "Swab";
        } else {
            document.getElementById("name").value = "";
        }
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
                                        <label htmlFor="id">Product</label>
                                        <Form.Control as="select" size="sm" id="id" name="id" onClick={this.onChangeOption} >
                                            {/*onClick={()=>{document.getElementById("id")[0].setAttribute("disabled","1");}}*/}
                                            <option value="" default>Klik untuk memilih produk</option>
                                            <option id="swab" key="swab" value="SWAB">SWAB</option>
                                            <option id="rapid" key="rapid" value="RAPID">RAPID</option>
                                        </Form.Control>
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