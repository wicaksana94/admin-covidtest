import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../config/Axios";
import * as Swal from "sweetalert2";

class EditClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city_list:[],
            vendor_list:[],
            clinic_details_data:[],
            id_edit:this.props.match.params.id,
            clinic_city:[],
            clinic_id_vendor:[],
            clinic_vendor_name:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteClinic = this.deleteClinic.bind(this);
    }

    componentDidMount() {
        this.getCity()
        this.getVendorData()
        this.getClinicById()
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

    getClinicById() {
        axios.request({
            method: 'GET',
            url: '/getClinicById/'+this.state.id_edit,
            responseType: 'json'
        }).then(response => this.setState({
            clinic_details_data:response.data
        })).then(response => this.state.clinic_details_data.map((clinic_details_data, index) => {
            return this.setState({
                clinic_city:clinic_details_data.city,
                clinic_id_vendor:clinic_details_data.id_vendor,
                clinic_vendor_name:clinic_details_data.vendor_name
            })
        }))
    }

    deleteClinic() {
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
                axios.delete(`/deleteClinic/${this.state.id_edit}`)
                    .then(res => {
                        Swal.fire(
                            'Berhasil Dihapus',
                            'Data klinik telah berhasil dihapus.',
                            'success'
                        ).then(result => {window.location.replace("/clinic")})
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
            url: '/updateClinic/',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data klinik telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/clinic")})
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
        let cityList =
            <Form.Control as="select" name="city" >
                {
                    this.state.city_list.map((city_list, index) => {
                        if (city_list.name === this.state.clinic_city) {
                            return <option id={city_list.id} key={city_list.id} value={city_list.name} selected>{city_list.name}</option>
                        } else {
                            return <option id={city_list.id} key={city_list.id} value={city_list.name}>{city_list.name}</option>
                        }
                    })
                }
            </Form.Control>

        let vendorList =
            <Form.Control as="select" name="id_vendor" >
                {
                    this.state.vendor_list.map((vendor_list, index) => {
                        if (vendor_list.id === this.state.clinic_id_vendor) {
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
                    <h3 className="page-title">Edit Clinic</h3>
                    <div>
                        <button className="btn btn-danger" onClick={this.deleteClinic}>Hapus Klinik</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama</label>
                                        {this.state.clinic_details_data.map(clinic_details_data => (
                                            <input placeholder="Isi nama disini" type="text" id="name" name="name" className="form-control form-control-lg" defaultValue={clinic_details_data.name} key={clinic_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Alamat</label>
                                        {this.state.clinic_details_data.map(clinic_details_data => (
                                            <input placeholder="Isi alamat disini" type="text" id="address" name="address" className="form-control form-control" defaultValue={clinic_details_data.address} key={clinic_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="kota">Kota</label>
                                        {cityList}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="capacity">Kapasitas</label>
                                        {this.state.clinic_details_data.map(clinic_details_data => (
                                            <input placeholder="Isi kapasitas disini" type="number" id="capacity" name="capacity" className="form-control form-control" defaultValue={clinic_details_data.capacity} key={clinic_details_data.id}/>
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

export default EditClinic;