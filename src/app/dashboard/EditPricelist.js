import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../axios/API";
import * as Swal from "sweetalert2";

class EditPricelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_list:[],
            pricelist_details_data:[],
            id_edit:this.props.match.params.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deletePricelist = this.deletePricelist.bind(this);
    }

    componentDidMount() {
        this.getProduct()
        this.getPricelistById()
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

    getPricelistById() {
        axios.request({
            method: 'GET',
            url: '/getPricelistById/'+this.state.id_edit,
            responseType: 'json'
        }).then(response => this.setState({
            pricelist_details_data:response.data
        }))
    }

    deletePricelist() {
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
                axios.delete(`/deletePricelist/${this.state.id_edit}`)
                    .then(res => {
                        Swal.fire(
                            'Berhasil Dihapus',
                            'Data klinik telah berhasil dihapus.',
                            'success'
                        ).then(result => {window.location.replace("/pricelist")})
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
            url: '/updatePricelist/',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data klinik telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/pricelist")})
                } else {
                    Swal.fire(
                        'Error',
                        'Error, cobalah beberapa saat lagi',
                        'error'
                    )
                }
            })
            .catch(err => {
                // console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">Edit Pricelist</h3>
                    <div>
                        <button className="btn btn-danger" onClick={this.deletePricelist}>Hapus Klinik</button>
                    </div>
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
                                        {this.state.pricelist_details_data.map(pricelist_details_data => (
                                            <input placeholder="Isi harga disini" type="text" id="harga" name="harga" className="form-control form-control-lg" defaultValue={pricelist_details_data.harga} key={pricelist_details_data.id}/>
                                        ))}
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

export default EditPricelist;