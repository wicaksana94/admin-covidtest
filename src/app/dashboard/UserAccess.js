import React, { Component } from 'react'
import {Link} from "react-router-dom";
import axios from "../axios/API";

export class UserAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_access_list:[]
        };
    }

    getUserAccess() {
        axios.request({
            method: 'GET',
            url: '/getUserAccess',
            responseType: 'json'
        }).then(response => this.setState({
            user_access_list:response.data
        }))
    }

    componentDidMount() {
        this.getUserAccess()
    }

    render() {
        let userAccessData = this.state.user_access_list.map(function(list_data, index){
            // Link creation for edit data
            const editLink = {
                pathname: "/edit_user_access/"+list_data.id,
                id: list_data.id
            };
            return(
                <tr key={list_data.id}>
                    <td>{list_data.id}</td>
                    <td>{list_data.name}</td>
                    <td>{list_data.menu_access}</td>
                    <td><Link to={editLink}><label id={"status_"+list_data.id} className="badge badge-warning" style={{cursor:"Pointer"}}>Edit</label></Link></td>
                </tr>
            )
        })
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> UserAccess Tables </h3>
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
                                <h4 className="card-title">Daftar Role Akses Pengguna</h4>
                                <p className="card-description">
                                    <Link to="/add_user_access"><button className="btn btn-primary text-center">+ Tambah</button></Link>
                                </p>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Access</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {userAccessData}
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

export default UserAccess