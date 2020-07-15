import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../axios/API";
import * as Swal from "sweetalert2";

class AddPricelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_list:[],
            vendor_list:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getProduct() {
        axios.request({
            method: 'GET',
            url: '/getProduct',
            responseType: 'json'
        }).then(response => this.setState({
            product_list:response.data
        }))
    }

    componentDidMount() {
        this.getProduct()
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        axios({
            method: 'post',
            url: '/postAddPricelist',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data harga telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/pricelist")})
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
                    <h3 className="page-title">Add Pricelist</h3>
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
                                        <div className="form-group">
                                            <label htmlFor="id_product">ID Product</label>
                                            <Form.Control as="select" name="id_product">
                                                {this.state.product_list.map(product_list => (
                                                    <option id={product_list.id} key={product_list.id} value={product_list.id}>{product_list.name}</option>
                                                ))}
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="harga">Price</label>
                                        <input placeholder="Isi harga disini" type="text" id="harga" name="harga" className="form-control form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label htmlFor="id_product">Type</label>
                                            <Form.Control as="select" name="jenis">
                                                <option id="type_1" value="publish">publish</option>
                                                <option id="type_2" value="1 - 50">1 - 50</option>
                                                <option id="type_3" value="50 - 100">50 - 100</option>
                                                <option id="type_1" value="> 100">> 100</option>
                                            </Form.Control>
                                        </div>
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

export default AddPricelist;