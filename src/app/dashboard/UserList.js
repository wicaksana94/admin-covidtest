import React, { Component } from 'react'
import {Link} from "react-router-dom";
import axios from "../axios/API";

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_list:[]
        };
    }

    getUserList() {
        axios.request({
            method: 'GET',
            url: '/getUserList',
            responseType: 'json'
        }).then(response => this.setState({
            user_list:response.data
        }))
    }

    componentDidMount() {
        this.getUserList()
    }

    render() {
        let userData = this.state.user_list.map(function(list_data, index){
            // Link creation for edit data
            const editLink = {
                pathname: "/edit_user/"+list_data.id,
                id: list_data.id
            };
            return(
                <tr key={list_data.id}>
                    <td>{list_data.id}</td>
                    <td>{list_data.fullname}</td>
                    <td>{list_data.email}</td>
                    <td>{list_data.phone}</td>
                    <td>{list_data.role_name}</td>
                    <td><Link to={editLink}><label id={"status_"+list_data.id} className="badge badge-warning" style={{cursor:"Pointer"}}>Edit</label></Link></td>
                </tr>
            )
        })
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> User List </h3>
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
                                <h4 className="card-title">Daftar Pengguna</h4>
                                <p className="card-description">
                                    <Link to="/add_user"><button className="btn btn-primary text-center">+ Tambah</button></Link>
                                </p>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {userData}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList