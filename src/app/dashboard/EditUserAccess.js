import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../config/Axios";
import * as Swal from "sweetalert2";

class EditUserAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_list:[],
            user_role_data:[],
            id_edit:this.props.match.params.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.getMenu()
        this.getUserRoleById()
    }

    getMenu() {
        axios.request({
            method: 'GET',
            url: '/getMenu',
            responseType: 'json'
        }).then(response => this.setState({
            menu_list:response.data
        }))
    }

    getUserRoleById() {
        axios.request({
            method: 'GET',
            url: '/getUserRoleById/'+this.state.id_edit,
            responseType: 'json'
        }).then(response => this.setState({
            user_role_data:response.data
        }))
    }

    handleCheckboxClick = (event) => {
        this.setState({
            status: event.target.checked
        });
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
                axios.delete(`/deleteUserAccess/${this.state.id_edit}`)
                    .then(function (response) {
                        if (response.data.code===200) {
                            Swal.fire(
                                'Berhasil Dihapus',
                                'Data akses telah berhasil dihapus.',
                                'success'
                            ).then(result => {
                                window.location.replace("/user_access")
                            })
                        }
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
            url: '/updateUserRole/',
            data: data,
        })
            .then(function (response) {
                if (response.data.code===204){
                    Swal.fire(
                        'Data tersimpan',
                        'Data pengguna telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/user_access")})
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
                    <h3 className="page-title">Edit User Access</h3>
                    <div>
                        <button className="btn btn-danger" onClick={this.deleteUser}>Hapus Akses</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama</label>
                                        {this.state.user_role_data.map(user_role => (
                                            <input placeholder="Isi nama role (jabatan) disini" type="text" id="name" name="name" key={user_role.id} defaultValue={user_role.name} className="form-control form-control-lg"/>
                                        ))}
                                    </div>
                                    <Form.Group >
                                        {this.state.menu_list.map(menu_list => (
                                            <Form.Check
                                                type="Checkbox"
                                                name="menu_access"
                                                key= {menu_list.id}
                                                id= {menu_list.id}
                                                label= {menu_list.name}
                                                value= {menu_list.id}
                                                checked={this.state.active}
                                                onChange={this.handleCheckboxClick}
                                            />
                                        ))}
                                    </Form.Group>
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUserAccess;