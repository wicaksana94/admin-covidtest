import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../config/API";
import * as Swal from "sweetalert2";

class AddVendor extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        axios({
            method: 'post',
            url: '/postAddVendor',
            data: data,
        })
            .then(function (response) {
                if (response.data.code===201){
                    Swal.fire(
                        'Data tersimpan',
                        'Data vendor telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/vendor")})
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

    render() {
        return (
            <div>
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Add Vendor</h3>
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
                                            <label htmlFor="name">Nama</label>
                                            <input placeholder="Isi nama disini" type="text" id="name" name="name" className="form-control form-control-lg"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Alamat</label>
                                            <input placeholder="Isi alamat disini" type="text" id="address" name="address" className="form-control form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Telepon</label>
                                            <input placeholder="Isi telepon" type="tel" id="phone" name="phone" className="form-control form-control"/>
                                        </div>
                                        <Form.Group controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control as="select" name="status">
                                                <option id="status_aktif" value="active">Aktif</option>
                                                <option id="status_tidak_aktif" value="nonactive">Tidak Aktif</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddVendor;