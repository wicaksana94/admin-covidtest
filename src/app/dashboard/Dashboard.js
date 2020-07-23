import React, { Component } from 'react';
import axios from "../config/API";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notPresentRegistrants:[],
      swabTestRegistrants:[],
      rapidTestRegistrants:[]
    }
  }

  getCountRegistrantNotPresent(){
    axios.request({
      method: 'GET',
      url: '/getCountRegistrantNotPresent',
      responseType: 'json'
    }).then(response => this.setState({
      notPresentRegistrants:response.data[0].not_present_registrants
    }))
  }

  getCountRegistrantSwab(){
    axios.request({
      method: 'GET',
      url: '/getCountRegistrantSwab',
      responseType: 'json'
    }).then(response => this.setState({
      swabTestRegistrants:response.data[0].swab_test_registrants
    }))
  }

  getCountRegistrantRapid(){
    axios.request({
      method: 'GET',
      url: '/getCountRegistrantRapid',
      responseType: 'json'
    }).then(response => this.setState({
      rapidTestRegistrants:response.data[0].rapid_test_registrants
    }))
  }

  componentDidMount() {
    this.getCountRegistrantNotPresent()
    this.getCountRegistrantRapid()
    this.getCountRegistrantSwab()
  }

  render () {
    return (
      <div>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-cube text-danger icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Total Pasien Belum Hadir</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">{this.state.notPresentRegistrants}</h3>
                    </div>
                  </div>
                </div>
                <small className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i>Total pasien yang belum hadir di klinik
                </small>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-cube text-primary icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Total Pendaftar SWAB</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">{this.state.swabTestRegistrants}</h3>
                    </div>
                  </div>
                </div>
                <small className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i>Total pendaftar tes SWAB
                </small>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-cube text-info icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Total Pendaftar RAPID</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">{this.state.rapidTestRegistrants}</h3>
                    </div>
                  </div>
                </div>
                <small className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i>Total pendaftar tes RAPID
                </small>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default Dashboard;