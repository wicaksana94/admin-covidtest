import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../axios/API";
import * as Swal from "sweetalert2";

class AddUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role_list:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getRole()
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

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        axios({
            method: 'post',
            url: '/postAddUser',
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
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Add User</h3>
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
                                            <label htmlFor="fullname">Nama</label>
                                            <input placeholder="Isi nama panjang disini" type="text" id="fullname" name="fullname" className="form-control form-control-lg"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input placeholder="Isi email disini" type="email" id="email" name="email" className="form-control form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input placeholder="Isi password disini" type="password" id="password" name="password" className="form-control form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Telepon</label>
                                            <input placeholder="Isi telepon" type="phone" id="phone" name="phone" className="form-control form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="role">Role</label>
                                            <Form.Control as="select" name="role_id">
                                                {this.state.role_list.map(role_list => (
                                                    <option id={role_list.id} key={role_list.id} value={role_list.id}>{role_list.name}</option>
                                                ))}
                                            </Form.Control>
                                        </div>
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

export default AddUserList;