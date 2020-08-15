import React, { Component } from 'react'
import axios from '../config/API'
import Swal from 'sweetalert2'
import myhelper from '../helper/myhelper'
import Select from 'react-select'

export class Registrant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit:[20],
            offset:[0],
            list_data:[],
            publish_fare_swab:[],
            publish_fare_rapid:[],
            invoice_swab:[],
            invoice_rapid:[],
            invoice_title:[],
            clinic_list:[]
        };

        this.handlerOnChange = this.handlerOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExportExcel = this.handleExportExcel.bind(this);
    }

    getRegistrant() {
        let limit = Number(this.state.limit);
        let offset = Number(this.state.offset);

        axios.request({
            method: 'GET',
            url: '/getRegistrant/'+limit+'/'+offset,
            responseType: 'json'
        }).then( response => this.setState({
                list_data: this.state.list_data.concat(response.data)
        })).then(response => this.setState({
            offset:(offset+limit)
        }))
    }

    getSumFareSwab(){
        axios.request({
            method: 'GET',
            url: '/getSumFareSwab',
            responseType: 'json'
        }).then( response => this.setState({
            publish_fare_swab: response.data
        }))
    }

    getInvoiceSwab(){
        axios.request({
            method: 'GET',
            url: '/getInvoiceSwab',
            responseType: 'json'
        }).then( response => this.setState({
            invoice_swab: response.data
        }))
    }

    getSumFareRapid(){
        axios.request({
            method: 'GET',
            url: '/getSumFareRapid',
            responseType: 'json'
        }).then( response => this.setState({
            publish_fare_rapid: response.data
        }))
    }

    getInvoiceRapid(){
        axios.request({
            method: 'GET',
            url: '/getInvoiceRapid',
            responseType: 'json'
        }).then( response => this.setState({
            invoice_rapid: response.data
        }))
    }

    getAllClinic() {
        axios.request({
            method: 'GET',
            url: '/getAllClinic/',
            responseType: 'json'
        }).then(response => this.setState({
            clinic_list:response.data
        }))
    }

    componentDidMount() {
        // Load first data
        this.getRegistrant()
        this.getSumFareSwab()
        this.getSumFareRapid()
        this.getInvoiceSwab()
        this.getInvoiceRapid()
        this.getAllClinic()

        if(localStorage.getItem('vendorID')){
            this.setState({
                invoice_title: "Tagihan dari Pointer"
            })
        } else {
            this.setState({
                invoice_title: "Tagihan ke Vendor"
            })
        }

        // Starting load data triggered when scrollbar is at the bottom of the page (Trigger Infinity Scroll)
        let loadNextData = () => this.getRegistrant()
        window.onscroll = function(ev) {
            // integer 30 below is just for init padding ratio outside the body offsetHeight
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 30)) {
                loadNextData()
            }
        };
    }

    handlerOnChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleExportExcel(event){
        event.preventDefault();
        let idbookingcode = document.getElementById('idbookingcode').value;
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;
        let test_date = document.getElementById('test_date').value;
        let clinic_city = document.getElementsByName('clinic_city')[0].value;

        axios.request({
            method: 'POST',
            url: '/exportExcel/',
            data: {
                idbookingcode: idbookingcode,
                name: name,
                phone: phone,
                email: email,
                test_date: test_date,
                clinic_city: clinic_city
            },
            responseType: 'blob', // important
        }).then((response) => {
            const timestampNow = String(new Date().valueOf()).substr(-10)
            const filename = 'ExportExcel_'+timestampNow;
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename+'.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let newSumFareSwab=0;
        let newSumFareRapid=0;
        let counterSwab=0;
        let counterRapid=0;
        let invoiceSwab = 0;
        let invoiceRapid = 0;

        axios({
            method: 'post',
            url: '/postFilterRegistrantData',
            data: data,
        })
            .then(function (response) {
                // replace existing tbody with filtered tbody
                var existingTbody = document.getElementById("registrant-tbody");
                var newTbody = document.createElement("tbody");
                newTbody.setAttribute("id", "registrant-tbody");
                existingTbody.parentNode.replaceChild(newTbody, existingTbody)

                response.data.map(function(list_data){
                    let badgeClass;
                    let status;

                    if(list_data.registrant_status==="0") {
                        badgeClass = "badge badge-danger";
                        status = "Belum";
                    } else {
                        badgeClass = "badge badge-success";
                        status = "Sudah";
                    }

                    // Re-create summary data based on the response
                    if (list_data.id_product==='SWB') {
                        newSumFareSwab += Number(list_data.publish_fare)
                        counterSwab++
                    } else if(list_data.id_product==='RPD') {
                        newSumFareRapid += Number(list_data.publish_fare)
                        counterRapid++
                    }

                    async function doCreate_tr() {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", "tr_"+list_data.id);
                        var existingTbody = document.getElementById("registrant-tbody");
                        existingTbody.appendChild(tr);
                    }

                    async function doCreate_td_id() {
                        var td_id = document.createElement("td");
                        var td_id_node = document.createTextNode(list_data.id);
                        td_id.appendChild(td_id_node);
                        var tr = document.getElementById("tr_"+list_data.id);
                        tr.appendChild(td_id);
                    }

                    async function doCreate_td_test_date() {
                        var td_test_date = document.createElement("td");
                        var test_date_node = document.createTextNode(list_data.test_date);
                        td_test_date.appendChild(test_date_node);
                        var tr = document.getElementById("tr_"+list_data.id);
                        tr.appendChild(td_test_date);
                    }

                    async function doCreate_td_name() {
                        var td_name = document.createElement("td");
                        var name_node = document.createTextNode(list_data.name);
                        td_name.appendChild(name_node);
                        var tr = document.getElementById("tr_"+list_data.id);
                        tr.appendChild(td_name);
                    }

                    async function doCreate_td_email() {
                        var td_email = document.createElement("td");
                        var email_node = document.createTextNode(list_data.email);
                        td_email.appendChild(email_node);
                        var tr = document.getElementById("tr_"+list_data.id);
                        tr.appendChild(td_email);
                    }

                    async function doCreate_td_phone() {
                        var td_phone = document.createElement("td");
                        var phone_node = document.createTextNode(list_data.phone);
                        td_phone.appendChild(phone_node);
                        var tr = document.getElementById("tr_"+list_data.id);
                        tr.appendChild(td_phone);
                    }

                    async function doCreate_td_test_covid() {
                        var td_test_covid = document.createElement("td");
                        var test_covid_node = document.createTextNode(list_data.test_covid);
                        td_test_covid.appendChild(test_covid_node);
                        var tr = document.getElementById("tr_"+list_data.id);
                        tr.appendChild(td_test_covid);
                    }

                    async function doCreate_td_publish_fare() {
                        var td_publish_fare = document.createElement("td");
                        var publish_fare_node = document.createTextNode(list_data.publish_fare);
                        td_publish_fare.appendChild(publish_fare_node);
                        var tr = document.getElementById("tr_"+list_data.id);
                        tr.appendChild(td_publish_fare);
                    }

                    async function doCreate_td_status() {
                        // make badge label
                        var label_status = document.createElement("label");
                        label_status.setAttribute("class", badgeClass);
                        label_status.setAttribute("id", "status_"+list_data.id);
                        label_status.onclick = function () {
                            changeStatus(list_data.id)
                        };

                        // change cursor to pointer when hover
                        label_status.style.cursor = "pointer";

                        // add status text to badge label
                        var status_node = document.createTextNode(status);
                        label_status.appendChild(status_node);

                        // make td status
                        var td_status = document.createElement("td");
                        td_status.appendChild(label_status);
                        var tr = document.getElementById("tr_"+list_data.id);

                        tr.appendChild(td_status);
                    }

                    async function doCreate_td_vendor_name() {
                        if (localStorage.getItem("vendorID") === null) {
                            var td_vendor_name = document.createElement("td");
                            var vendor_name_node = document.createTextNode(list_data.vendor_name);
                            td_vendor_name.appendChild(vendor_name_node);
                            var tr = document.getElementById("tr_" + list_data.id);
                            tr.appendChild(td_vendor_name);
                        }
                    }

                    function changeStatus(id){
                        console.log(id)
                        Swal.fire({
                            title: 'Apakah Anda yakin mengubah status?',
                            // text: "helo "+list_data.id,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ya',
                            cancelButtonText: 'Tidak',
                        }).then(result=> {
                            if (result.value) {
                                const data = new FormData();
                                data.set("id_registrant",id)

                                axios({
                                    method: 'post',
                                    url: '/updateRegistrantStatus',
                                    data: data,
                                })
                                    .then(res => {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Berhasil',
                                            text: 'Status berhasil diubah.'
                                        }).then(response => {
                                            if (res.data.status===1 && res.data.new_status==="Belum") {
                                                let existingStatusBanner = document.getElementById("status_"+list_data.id);
                                                existingStatusBanner.className = "badge badge-danger";
                                                existingStatusBanner.innerHTML = 'Belum';
                                            } else if (res.data.status===1 && res.data.new_status==="Sudah") {
                                                let existingStatusBanner = document.getElementById("status_"+list_data.id);
                                                existingStatusBanner.className = "badge badge-success";
                                                existingStatusBanner.innerHTML = 'Sudah';
                                            } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Error',
                                                    text: 'Terjadi eror, harap coba beberapa saat lagi.'
                                                })
                                            }
                                        })

                                    })
                                    .catch(err => {
                                        // console.log(err);
                                    });
                            }
                        })
                    }

                    // fill the table with new data from filter
                    async function populateFilteredData(){
                        await doCreate_tr()
                        await doCreate_td_id()
                        await doCreate_td_test_date()
                        await doCreate_td_name()
                        await doCreate_td_email()
                        await doCreate_td_phone()
                        await doCreate_td_test_covid()
                        await doCreate_td_publish_fare()
                        await doCreate_td_vendor_name()
                        await doCreate_td_status()
                    }

                    return populateFilteredData()
                });

            })
            .then(function doReCreateSummary() {
                axios({
                    method: 'get',
                    url: '/getSwabPricelistByTotalRegistrant/'+counterSwab,
                }).then(function(response){
                    invoiceSwab = response.data;
                    document.getElementById('swabPublishFare').innerHTML = myhelper.convertToRupiah(newSumFareSwab)
                    document.getElementById('swabTagihanVendor').innerHTML = myhelper.convertToRupiah(invoiceSwab)
                })

                axios({
                    method: 'get',
                    url: '/getRapidPricelistByTotalRegistrant/'+counterRapid,
                }).then(function(response){
                    invoiceRapid = response.data;
                    document.getElementById('rapidPublishFare').innerHTML = myhelper.convertToRupiah(newSumFareRapid)
                    document.getElementById('rapidTagihanVendor').innerHTML = myhelper.convertToRupiah(invoiceRapid)
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        let registrantData = this.state.list_data.map(function(list_data, index){
            let badgeClass
            let status
            let vendorName
            function changeStatus(id){
                Swal.fire({
                    title: 'Apakah Anda yakin mengubah status?',
                    // text: "helo "+list_data.id,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then(async result=> {
                    if (result.value) {
                        const data = new FormData();
                        data.set("id_registrant", id);

                        axios({
                            method: 'post',
                            url: '/updateRegistrantStatus',
                            data: data,
                        })
                        .then(res => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil',
                                text: 'Status berhasil diubah.'
                            }).then(response => {
                                if (res.data.status===1 && res.data.new_status==="Belum") {
                                    let existingStatusBanner = document.getElementById("status_"+list_data.id);
                                    existingStatusBanner.className = "badge badge-danger";
                                    existingStatusBanner.innerHTML = 'Belum';
                                } else if (res.data.status===1 && res.data.new_status==="Sudah") {
                                    let existingStatusBanner = document.getElementById("status_"+list_data.id);
                                    existingStatusBanner.className = "badge badge-success";
                                    existingStatusBanner.innerHTML = 'Sudah';
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Terjadi eror, harap coba beberapa saat lagi.'
                                    })
                                }
                            })

                        })
                        .catch(err => {
                            // console.log(err);
                        });
                    }
                })
            }
            if(list_data.registrant_status==="0") {
                badgeClass = "badge badge-danger";
                status = "Belum";
            } else {
                badgeClass = "badge badge-success";
                status = "Sudah";
            }

            // Jika login sebagai admin maka tampilkan data nama vendor
            if (localStorage.getItem("vendorID") === null){
                vendorName = <td>{list_data.vendor_name}</td>;
            }


            return (
                <tr key={index}>
                    <td>{list_data.id}</td>
                    <td>{myhelper.convertToSlashDateFormat(list_data.test_date)}</td>
                    <td>{list_data.name}</td>
                    <td>{list_data.email}</td>
                    <td>{list_data.phone}</td>
                    <td>{list_data.test_covid}</td>
                    <td>{myhelper.convertToRupiah(list_data.publish_fare)}</td>
                    {vendorName}
                    <td><label id={"status_"+list_data.id} className={badgeClass} onClick={() => changeStatus(list_data.id)} style={{cursor:"Pointer"}}>{status}</label></td>
                </tr>
            );
        })

        let vendorNameHeader
        // Jika login sebagai admin maka tampilkan header tabel data nama vendor
        if (localStorage.getItem("vendorID") === null){
            vendorNameHeader = <th>Vendor</th>;
        }

        // Set data dropdown clinic
        let options_clinic_city = [];
        this.state.clinic_list.map(function(clinic_list, index){
            let value = `${clinic_list.name}_${clinic_list.city}`;
            let label = `${clinic_list.name} (${clinic_list.city})`;

            const entries = new Map([
                ['value', value],
                ['label', label]
            ]);

            const obj = Object.fromEntries(entries);
            return options_clinic_city.push(obj)
        })

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Daftar Peserta Tes Covid</h4>
                                <form className="row" onSubmit={this.handleSubmit}>
                                    <div className="col-lg-6">
                                        <div className="form-group row">
                                            <label htmlFor="formPlaintextTanggal"
                                                   className="form-label col-form-label col-sm-2">Tanggal</label>
                                            <div className="col-lg-4 col-md-4 col-sm-10">
                                                <input type="date" placeholder="Tanggal Rapid" id="test_date" name="test_date" className="form-control form-control-lg"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="formPlaintextBookingCodeID"
                                                   className="form-label col-form-label col-sm-2">ID</label>
                                            <div className="col-sm-10">
                                                <input placeholder="Isi ID kodebooking disini" type="idbookingcode" id="idbookingcode" name="idbookingcode" className="form-control form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="formPlaintextNama"
                                                   className="form-label col-form-label col-sm-2">Nama</label>
                                            <div className="col-sm-10">
                                                <input placeholder="Isi nama disini" type="text" id="name" name="name" className="form-control form-control-lg"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group row">
                                            <label htmlFor="formPlaintextNoHP"
                                                   className="form-label col-form-label col-sm-2">No. HP</label>
                                            <div className="col-sm-10">
                                                <input placeholder="Isi no.HP disini" type="phone" id="phone" name="phone" className="form-control form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="formPlaintextEmail"
                                                   className="form-label col-form-label col-sm-2">Email</label>
                                            <div className="col-sm-10">
                                                <input placeholder="Isi email disini" type="email" id="email" name="email" className="form-control form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="formPlaintextEmail"
                                                   className="form-label col-form-label col-sm-2">Klinik/Kota</label>
                                            <div className="col-sm-10">
                                                <Select name="clinic_city" options={options_clinic_city} className="small" placeholder="Isi nama klinik atau kota disini" />
                                            </div>
                                        </div>
                                        <div className="justify-content-end d-flex row">
                                            <button className="btn btn-lg btn-success m-2" onClick={this.handleExportExcel}>Export Excel</button>
                                            <button className="btn btn-lg btn-info m-2" onClick={()=>window.location.reload()}>Reset Filter</button>
                                            <button className="btn btn-lg btn-primary m-2">Filter</button>
                                        </div>
                                    </div>
                                </form>
                                <div className="summaryOfRegistrantData my-5 p-3 text-center border rounded border-primary">
                                    <h4 className="mb-3"><b><u>Summary</u></b></h4>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Jenis Test</th>
                                            <th scope="col">Publish Fare</th>
                                            <th scope="col">{this.state.invoice_title}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>SWAB</td>
                                            <td id="swabPublishFare">
                                                {myhelper.convertToRupiah(this.state.publish_fare_swab)}
                                            </td>
                                            <td id="swabTagihanVendor">
                                                {myhelper.convertToRupiah(this.state.invoice_swab)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>RAPID</td>
                                            <td id="rapidPublishFare">
                                                {myhelper.convertToRupiah(this.state.publish_fare_rapid)}
                                            </td>
                                            <td id="rapidTagihanVendor">
                                                {myhelper.convertToRupiah(this.state.invoice_rapid)}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tanggal</th>
                                            <th>Nama</th>
                                            <th>Email</th>
                                            <th>No.HP</th>
                                            <th>Jenis Test</th>
                                            <th>Publish Fare</th>
                                            {vendorNameHeader}
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody id="registrant-tbody">
                                        {registrantData}
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

export default Registrant