import React, {Component} from 'react';
import axios from "../config/API";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import * as Swal from "sweetalert2";

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: localStorage.getItem("userID"),
            user_fullname: localStorage.getItem("fullName"),
            user_phone: localStorage.getItem("phone"),
            user_email: localStorage.getItem("email"),
            user_role_name: localStorage.getItem("roleName"),
            user_vendor_name: localStorage.getItem("vendorName"),
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSubmitNewPassword(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('id', this.state.user_id);

        axios({
            method: 'post',
            url: '/updatePassword/',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data password telah berhasil diganti',
                        'success'
                    ).then(result => {window.location.replace("/my_profile")})
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

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('id', this.state.user_id);

        axios({
            method: 'post',
            url: '/saveProfile/',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data pengguna telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/my_profile")})
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

    componentDidMount() {

    }

    render() {
        const emailTextStyle = {
            color: "dimgrey",
            fontWeight: "bold"
        };

        const changePasswordTextStyle = {
            color: "dodgerblue",
            fontWeight: "bold",
            cursor: "pointer"
        };

        const modalFooterStyle = {
            width: "100%",
            justifyContent: "flex-end"
        }

        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmitNewPassword} className="row p-3">
                    <Modal.Body>
                            <div className="form-group col-12">
                                <label htmlFor="password">Your New Password</label>
                                <input placeholder="Isi password baru disini" type="password" id="password" name="password" className="form-control form-control"/>
                            </div>
                    </Modal.Body>
                    <Modal.Footer style={modalFooterStyle}>
                        <Button variant="secondary" onClick={this.handleClose} className="btn-lg">
                            Close
                        </Button>
                        <Button variant="primary" type="submit" className="btn-lg">
                            Change Password
                        </Button>
                    </Modal.Footer>
                </form>
                </Modal>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h3>Halo, {this.state.user_fullname} ({this.state.user_role_name}) {this.state.user_vendor_name===null? '' : `- ${this.state.user_vendor_name}`}</h3>
                                <h5 className="mb-5" style={emailTextStyle}>{this.state.user_email}</h5>
                                <form onSubmit={this.handleSubmit} className="row p-3">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="fullname">Fullname</label>
                                            <input defaultValue={this.state.user_fullname} placeholder="Isi nama lengkap disini" type="text" id="fullname" name="fullname" className="form-control form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input defaultValue={this.state.user_email} placeholder="Isi email disini" type="text" id="email" name="email" className="form-control form-control-lg"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input defaultValue={this.state.user_phone} placeholder="Isi telepon disini" type="tel" id="phone" name="phone" className="form-control form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="phone">Password</label>
                                            <br/>
                                            <span className="d-flex justify-content-between">
                                                <label>****************</label>
                                                <label onClick={this.handleShow} style={changePasswordTextStyle}>Change Password</label>
                                            </span>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className="d-flex m-auto">
                                        <button type="submit" className="btn btn-primary btn-lg">Save Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyProfile;