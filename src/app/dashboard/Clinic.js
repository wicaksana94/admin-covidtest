import React, { Component } from 'react'
import axios from "../axios/API";
import {Link} from 'react-router-dom'

export class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit:[20],
            offset:[0],
            list_data:[]
        };

        // this.handlerOnChange = this.handlerOnChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    getClinic() {
        let limit = Number(this.state.limit);
        let offset = Number(this.state.offset);

        axios.request({
            method: 'GET',
            url: '/getClinic/'+limit+'/'+offset,
            responseType: 'json'
        }).then(response => this.setState({
            list_data:response.data
        })).then(response => this.setState({
            offset:(offset+limit)
        }))
    }

    componentDidMount() {
        // Load first data
        this.getClinic()

        // Starting load data triggered when scrollbar is at the bottom of the page (Trigger Infinity Scroll)
        let loadNextData = () => this.getRegistrant()
        window.onscroll = function(ev) {
            // integer 30 below is just for init padding ratio outside the body offsetHeight
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 30)) {
                loadNextData()
            }
        };
    }


    render() {
        let clinicData = this.state.list_data.map(function(list_data, index){
            // Link creation for edit data
            const editLink = {
                pathname: "/edit_clinic/"+list_data.id,
                id: list_data.id
            };
            return(
                <tr key={list_data.id}>
                    <td>{list_data.name}</td>
                    <td>{list_data.address}</td>
                    <td>{list_data.city}</td>
                    <td>{list_data.capacity}</td>
                    <td>{list_data.vendor_name}</td>
                    <td><Link to={editLink}><label id={"status_"+list_data.id} className="badge badge-warning" style={{cursor:"Pointer"}}>Edit</label></Link></td>
                </tr>
            )
        })
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> Clinic Tables </h3>
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
                                    <Link to="/add_clinic"><button className="btn btn-primary text-center">+ Tambah</button></Link>
                                </p>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Alamat</th>
                                            <th>Kota</th>
                                            <th>Kapasitas</th>
                                            <th>Vendor</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {clinicData}
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

export default Clinic