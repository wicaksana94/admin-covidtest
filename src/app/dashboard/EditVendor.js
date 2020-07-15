import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../axios/API";
import * as Swal from "sweetalert2";

class EditVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendor_details_data:[],
            id_edit:this.props.match.params.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteVendor = this.deleteVendor.bind(this);
    }

    componentDidMount() {
        this.getVendorById()
    }

    getVendorById() {
        axios.request({
            method: 'GET',
            url: '/getVendorById/'+this.state.id_edit,
            responseType: 'json'
        }).then(response => this.setState({
            vendor_details_data:response.data
        }))
    }

    deleteVendor() {
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
                axios.delete(`/deleteVendor/${this.state.id_edit}`)
                    .then(res => {
                        Swal.fire(
                            'Berhasil Dihapus',
                            'Data klinik telah berhasil dihapus.',
                            'success'
                        ).then(result => {window.location.replace("/vendor")})
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
            url: '/updateVendor/',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data vendor telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/vendor")})
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
                    <h3 className="page-title">Edit Vendor</h3>
                    <div>
                        <button className="btn btn-danger" onClick={this.deleteVendor}>Hapus Klinik</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {/*<h4 className="card-title">Menambahkan data klinik</h4>*/}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama</label>
                                        {this.state.vendor_details_data.map(vendor_details_data => (
                                            <input placeholder="Isi nama disini" type="text" id="name" name="name" className="form-control form-control-lg" defaultValue={vendor_details_data.name} key={vendor_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Alamat</label>
                                        {this.state.vendor_details_data.map(vendor_details_data => (
                                            <input placeholder="Isi alamat disini" type="text" id="address" name="address" className="form-control form-control" defaultValue={vendor_details_data.address} key={vendor_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Telepon</label>
                                        {this.state.vendor_details_data.map(vendor_details_data => (
                                            <input placeholder="Isi telepon disini" type="phone" id="phone" name="phone" className="form-control form-control" defaultValue={vendor_details_data.phone} key={vendor_details_data.id}/>
                                        ))}
                                    </div>
                                    <Form.Group controlId="status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" name="status">
                                            <option id="status_aktif" value="active">Aktif</option>
                                            <option id="status_tidak_aktif" value="nonactive">Tidak Aktif</option>
                                        </Form.Control>
                                    </Form.Group>
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

export default EditVendor;