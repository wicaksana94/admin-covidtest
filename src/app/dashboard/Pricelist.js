import React, { Component } from 'react'
import {Link} from "react-router-dom";
import axios from "../axios/API";
import myhelper from '../helper/myhelper'

export class Pricelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pricelist_list:[]
        };
    }

    getPricelist() {
        axios.request({
            method: 'GET',
            url: '/getPricelist',
            responseType: 'json'
        }).then(response => this.setState({
            pricelist_list:response.data
        }))
    }

    componentDidMount() {
        this.getPricelist()
    }

    render() {
        let pricelistData = this.state.pricelist_list.map(function(list_data, index){
            // Link creation for edit data
            const editLink = {
                pathname: "/edit_pricelist/"+list_data.id,
                id: list_data.id
            };
            return(
                <tr key={list_data.id}>
                    <td>{list_data.id}</td>
                    <td>{list_data.id_product}</td>
                    <td>{myhelper.convertToRupiah(list_data.harga)}</td>
                    <td>{list_data.jenis}</td>
                    <td><Link to={editLink}><label id={"status_"+list_data.id} className="badge badge-warning" style={{cursor:"Pointer"}}>Edit</label></Link></td>
                </tr>
            )
        })
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> Pricelist Tables </h3>
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
                                <h4 className="card-title">Daftar Harga</h4>
                                <p className="card-description">
                                    <Link to="/add_pricelist"><button className="btn btn-primary text-center">+ Tambah</button></Link>
                                </p>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>ID Product</th>
                                            <th>Price</th>
                                            <th>Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {pricelistData}
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

export default Pricelist