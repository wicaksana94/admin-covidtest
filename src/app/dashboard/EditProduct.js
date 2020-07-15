import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../axios/API";
import * as Swal from "sweetalert2";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city_list:[],
            vendor_list:[],
            product_details_data:[],
            id_edit:this.props.match.params.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getVendor()
        this.getProductById()
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

    getProductById() {
        axios.request({
            method: 'GET',
            url: '/getProductById/'+this.state.id_edit,
            responseType: 'json'
        }).then(response => this.setState({
            product_details_data:response.data
        }))
    }

    deleteProduct() {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data akan terhapus selamanya.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.value) {
                axios.delete(`/deleteProduct/${this.state.id_edit}`)
                    .then(res => {
                        Swal.fire(
                            'Berhasil Dihapus',
                            'Data klinik telah berhasil dihapus.',
                            'success'
                        ).then(result => {window.location.replace("/product")})
                    })
            }
        })


    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(event.target)
        const data = new FormData(event.target);
        data.append('id', this.state.id_edit);

        axios({
            method: 'post',
            url: '/updateProduct/',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data klinik telah tersimpan',
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
                    <h3 className="page-title">Edit Product</h3>
                    <div>
                        <button className="btn btn-danger" onClick={this.deleteProduct}>Hapus Klinik</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {/*<h4 className="card-title">Menambahkan data klinik</h4>*/}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="id">ID</label>
                                        {this.state.product_details_data.map(product_details_data => (
                                            <input placeholder="Isi ID disini" type="text" id="id" name="id" className="form-control form-control" defaultValue={product_details_data.id} key={product_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama</label>
                                        {this.state.product_details_data.map(product_details_data => (
                                            <input placeholder="Isi nama disini" type="text" id="name" name="name" className="form-control form-control-lg" defaultValue={product_details_data.name} key={product_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vendor">Vendor</label>
                                        <Form.Control as="select" name="id_vendor" >
                                            {this.state.vendor_list.map(vendor_list => (
                                                <option id={vendor_list.id} key={vendor_list.id} value={vendor_list.id}>{vendor_list.name}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    <button type="submit" className="btn btn-primary mr-2">Simpan Perubahan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProduct;