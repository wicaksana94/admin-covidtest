import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../config/Axios";
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
        this.getVendorData()
        this.getProductById()
        this.checkProductType()
        this.disableSelectProduct()
    }

    disableSelectProduct(){
        document.getElementById('id').setAttribute('disabled','')
    }

    enableSelectProduct(){
        document.getElementById('id').removeAttribute('disabled','')
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

    getProductById() {
        axios.request({
            method: 'GET',
            url: '/getProductById/'+this.state.id_edit,
            responseType: 'json'
        }).then(response => this.setState({
            product_details_data:response.data
        })).then(response => this.state.product_details_data.map((product_details_data, index) => {
            return this.setState({
                product_id:product_details_data.city,
                product_id_vendor:product_details_data.id_vendor,
                product_name:product_details_data.name
            })
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
                    .then(function (response) {
                        if (response.data.code===200) {
                            Swal.fire(
                                'Berhasil Dihapus',
                                'Data produk telah berhasil dihapus.',
                                'success'
                            ).then(result => {
                                window.location.replace("/product")
                            })
                        }
                    })
            }
        })


    }

    checkProductType(){
        if (this.state.id_edit.includes("SWAB")){
            document.getElementById("id").value = "SWAB";
        } else if (this.state.id_edit.includes("RAPID")){
            document.getElementById("id").value = "RAPID";
        } else {
            document.getElementById("id").value = "";
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.enableSelectProduct();
        // console.log(event.target)
        const data = new FormData(event.target);
        data.append('id', this.state.id_edit);

        axios({
            method: 'post',
            url: '/updateProduct/',
            data: data,
        })
            .then(function (response) {
                if (response.data.code===204){
                    Swal.fire(
                        'Data tersimpan',
                        'Data produk telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/product")})
                } else if (response.data.code===309){
                    Swal.fire(
                        'Error',
                        'Data yang Anda masukkan sudah ada, mohon cek ulang di menu Produk.',
                        'error'
                    )
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
        let vendorList =
            <Form.Control as="select" name="id_vendor" >
                {
                    this.state.vendor_list.map((vendor_list, index) => {
                        if (vendor_list.id === this.state.product_id_vendor) {
                            return <option id={vendor_list.id} key={vendor_list.id} value={vendor_list.id} selected>{vendor_list.name}</option>
                        } else {
                            return <option id={vendor_list.id} key={vendor_list.id} value={vendor_list.id}>{vendor_list.name}</option>
                        }
                    })
                }
            </Form.Control>

        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">Edit Product</h3>
                    <div>
                        <button className="btn btn-danger" onClick={this.deleteProduct}>Hapus Produk</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {/*<h4 className="card-title">Menambahkan data produk</h4>*/}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="id">Product</label>
                                        <Form.Control as="select" size="sm" id="id" name="id" onClick={this.onChangeOption} readonly>
                                            {/*onClick={()=>{document.getElementById("id")[0].setAttribute("disabled","1");}}*/}
                                            <option value="" default>Klik untuk memilih produk</option>
                                            <option id="swab" key="swab" value="SWAB">SWAB</option>
                                            <option id="rapid" key="rapid" value="RAPID">RAPID</option>
                                        </Form.Control>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama</label>
                                        {this.state.product_details_data.map(product_details_data => (
                                            <input placeholder="Isi nama disini" type="text" id="name" name="name" className="form-control form-control-lg" defaultValue={product_details_data.name} key={product_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vendor">Vendor</label>
                                        {vendorList}
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