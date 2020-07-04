import React, { Component } from 'react'
import axios from "../axios/API";
import {Link} from 'react-router-dom'

export class Vendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_data:[]
        };
    }

    getVendor() {
        axios.request({
            method: 'GET',
            url: '/getVendor',
            responseType: 'json'
        }).then(response => this.setState({
            list_data:response.data
        }))
    }

    componentDidMount() {
        this.getVendor()
    }


    render() {
        let vendorData = this.state.list_data.map(function(list_data, index){
            // Link creation for edit data
            const editLink = {
                pathname: "/edit_vendor/"+list_data.id,
                id: list_data.id
            };
            return(
                <tr key={list_data.id}>
                    <td>{list_data.name}</td>
                    <td>{list_data.address}</td>
                    <td>{list_data.phone}</td>
                    <td>{(list_data.status).toUpperCase()}</td>
                    <td><Link to={editLink}><label id={"status_"+list_data.id} className="badge badge-warning" style={{cursor:"Pointer"}}>Edit</label></Link></td>
                </tr>
            )
        })
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> Vendor Tables </h3>
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
                                <h4 className="card-title">Daftar Klinik</h4>
                                <p className="card-description">
                                    <Link to="/add_vendor"><button className="btn btn-primary text-center">+ Tambah</button></Link>
                                </p>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Alamat</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {vendorData}
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

export default Vendor