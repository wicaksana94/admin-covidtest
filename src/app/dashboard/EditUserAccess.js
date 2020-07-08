import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../axios/API";
import * as Swal from "sweetalert2";

class EditUserAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role_list:[],
            user_details_data:[],
            id_edit:this.props.match.params.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.getRole()
        this.getUserById()
    }

    getRole() {
        axios.request({
            method: 'GET',
            url: '/getRole',
            responseType: 'json'
        }).then(response => this.setState({
            role_list:response.data
        }))
    }

    getUserById() {
        axios.request({
            method: 'GET',
            url: '/getUserById/'+this.state.id_edit,
            responseType: 'json'
        }).then(response => this.setState({
            user_details_data:response.data
        }))
    }

    deleteUser() {
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
                axios.delete(`/deleteUser/${this.state.id_edit}`)
                    .then(res => {
                        Swal.fire(
                            'Berhasil Dihapus',
                            'Data pengguna telah berhasil dihapus.',
                            'success'
                        ).then(result => {window.location.replace("/user_list")})
                    })
            }
        })


    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('id', this.state.id_edit);

        axios({
            method: 'post',
            url: '/updateUser/',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data pengguna telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/user_list")})
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
                    <h3 className="page-title">Edit User</h3>
                    <div>
                        <button className="btn btn-danger" onClick={this.deleteUser}>Hapus Pengguna</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {/*<h4 className="card-title">Menambahkan data klinik</h4>*/}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="fullname">Nama</label>
                                        {this.state.user_details_data.map(user_details_data => (
                                            <input placeholder="Isi nama panjang disini" type="text" id="fullname" name="fullname" className="form-control form-control-lg" defaultValue={user_details_data.fullname} key={user_details_data.id}/>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vendor">Role</label>
                                        <Form.Control as="select" name="role_id" >
                                            {this.state.role_list.map(role_list => (
                                                <option id={role_list.id} key={role_list.id} value={role_list.id}>{role_list.name}</option>
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

export default EditUserAccess;