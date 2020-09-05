import React, { Component } from 'react'
import {Link} from "react-router-dom";
import axios from "../config/Axios";
import myhelper from '../helper/myhelper'

export class Pricelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit:[20],
            offset:[0],
            pricelist_list:[]
        };
    }

    getPricelist() {
        let limit = Number(this.state.limit);
        let offset = Number(this.state.offset);

        axios.request({
            method: 'GET',
            url: '/getPricelist/'+limit+'/'+offset,
            responseType: 'json'
        }).then(response => this.setState({
            pricelist_list: this.state.pricelist_list.concat(response.data)
        })).then(response => this.setState({
            offset:(offset+limit)
        }))
    }

    componentDidMount() {
        // Load first data
        this.getPricelist()

        // Starting load data triggered when scrollbar is at the bottom of the page (Trigger Infinity Scroll)
        let loadNextData = () => this.getPricelist()
        window.onscroll = function(ev) {
            // integer 30 below is just for init padding ratio outside the body offsetHeight
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 30)) {
                loadNextData()
            }
        };
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