import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../config/API";
import * as Swal from "sweetalert2";

class AddPricelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_list:[],
            vendor_list:[],
            showBatasJumlahPendaftar: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlerOnChange = this.handlerOnChange.bind(this);

    }

    getProduct() {
        axios.request({
            method: 'GET',
            url: '/getAllProduct',
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
        let batas_atas = Number(document.getElementById('batas_atas').value);
        let batas_bawah = Number(document.getElementById('batas_bawah').value);
        if (batas_atas < batas_bawah){
            Swal.fire(
                'Error',
                'Batas Atas harus lebih besar daripada Batas Bawah',
                'error'
            )
            return
        } else {
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
    }

    handlerOnChange=(e)=>{
        if (e.target.value==="non_publish") {
            this.setState({
                showBatasJumlahPendaftar: true,
                [e.target.name] : e.target.value
            })
        } else {
            this.setState({
                showBatasJumlahPendaftar: false,
                [e.target.name] : e.target.value
            })
        }
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
                                                    <option id={product_list.id} key={product_list.id} value={product_list.id}>{product_list.name} - {product_list.vendor_name}</option>
                                                ))}
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label htmlFor="id_product">Type</label>
                                            <Form.Control as="select" name="is_publish" onChange={this.handlerOnChange} >
                                                <option id="publish" value="publish">Publish</option>
                                                <option id="non_publish" value="non_publish">Non-Publish</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <div className={this.state.showBatasJumlahPendaftar===true ? "form-group" : "d-none"}>
                                        <label htmlFor="batas_bawah">Angka Batas Bawah Jumlah Pendaftar</label>
                                        <input placeholder="Isi angka batas bawah jumlah pendaftar disini" type="number" min="1" id="batas_bawah" name="batas_bawah" className="form-control form-control-lg"/>
                                    </div>
                                    <div className={this.state.showBatasJumlahPendaftar===true ? "form-group" : "d-none"}>
                                        <label htmlFor="batas_atas">Angka Batas Atas Jumlah Pendaftar</label>
                                        <input placeholder="Isi angka batas atas jumlah pendaftar disini" type="number" min="1" id="batas_atas" name="batas_atas" className="form-control form-control-lg"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="harga">Harga</label>
                                        <input placeholder="Isi harga disini" type="number" id="harga" name="harga" className="form-control form-control"/>
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