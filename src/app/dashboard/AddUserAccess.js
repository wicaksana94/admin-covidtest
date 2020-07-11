import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "../axios/API";
import * as Swal from "sweetalert2";

class AddUserAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_list:[],
            status: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getMenu()
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

    handleCheckboxClick = (event) => {
        this.setState({
            status: event.target.checked
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // console.log(data)

        axios({
            method: 'post',
            url: '/postAddUserRole',
            data: data,
        })
            .then(function (response) {
                if (response.data===1){
                    Swal.fire(
                        'Data tersimpan',
                        'Data akses telah tersimpan',
                        'success'
                    ).then(result => {window.location.replace("/user_access")})
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
                        <h3 className="page-title">Add User Access</h3>
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
                                            <input placeholder="Isi nama role (jabatan) disini" type="text" id="name" name="name" className="form-control form-control-lg" required />
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
            </div>
        );
    }
}

export default AddUserAccess;