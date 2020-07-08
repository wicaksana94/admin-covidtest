import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Swal from "sweetalert2";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  handleLogout() {
    Swal.fire({
      title: 'Apakah Anda yakin untuk Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(result=> {
      if (result.value) {
        localStorage.removeItem("loginStatus");
        window.location.reload();
      }
    })
  };

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });


    const dropdownPaths = [
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/registrant', state: 'registrantMenuOpen'},
      {path:'/clinic', state: 'clinicMenuOpen'},
      {path:'/pricelist', state: 'pricelistMenuOpen'},
      {path:'/product', state: 'productMenuOpen'},
      {path:'/vendor', state: 'vendorMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));

  }
  render () {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          {/*<div className="text-center sidebar-brand-wrapper d-flex align-items-center">*/}
          {/*  <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo.svg")} alt="logo" /></a>*/}
          {/*  <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-mini.svg" )} alt="logo" /></a>*/}
          {/*</div>*/}
          <ul className="nav">
            <li className="nav-item nav-profile not-navigation-link">
              <div className="nav-link">
                <Dropdown>
                  <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="profile-image">
                        <img src={ require("../../assets/images/faces/face8.jpg")} alt="profile" />
                      </div>
                      <div className="text-left ml-3">
                        <p className="profile-name">{localStorage.getItem('fullName')}</p>
                        <small className="designation text-muted text-small">{localStorage.getItem('roleName')}</small>
                        {/*<span className="status-indicator online"></span>*/}
                      </div>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="preview-list navbar-dropdown">
                    <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                      <div className="d-flex">
                        <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                          <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                        </div>
                        <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                          <i className="mdi mdi-account-outline mr-0"></i>
                        </div>
                        <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                          <i className="mdi mdi-alarm-check mr-0"></i>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                      Manage Accounts
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                      Check Inbox
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/*<button className="btn btn-success btn-block">New Project <i className="mdi mdi-plus"></i></button>*/}
              </div>
            </li>
            <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/dashboard">
                <i className="mdi mdi-television menu-icon"></i>
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
            {/*<li className={ this.isPathActive('/basic-ui') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">*/}
            {/*    <i className="mdi mdi-crosshairs-gps menu-icon"></i>*/}
            {/*    <span className="menu-title">Basic UI Elements</span>*/}
            {/*    <i className="menu-arrow"></i>*/}
            {/*  </div>*/}
            {/*  <Collapse in={ this.state.basicUiMenuOpen }>*/}
            {/*    <ul className="nav flex-column sub-menu">*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link' } to="/basic-ui/buttons">Buttons</Link></li>*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link' } to="/basic-ui/dropdowns">Dropdowns</Link></li>*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link' } to="/basic-ui/typography">Typography</Link></li>*/}
            {/*    </ul>*/}
            {/*  </Collapse>*/}
            {/*</li>*/}
            <li className={ this.isPathActive('/registrant') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/registrant">
                <i className="mdi mdi-account menu-icon"></i>
                <span className="menu-title">Registrant</span>
              </Link>
            </li>
            <li className={ this.isPathActive('/clinic') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/clinic">
                <i className="mdi mdi-hospital menu-icon"></i>
                <span className="menu-title">Clinic</span>
              </Link>
            </li>
            <li className={ this.isPathActive('/pricelist') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/pricelist">
                <i className="mdi mdi-account-cash menu-icon"></i>
                <span className="menu-title">Pricelist</span>
              </Link>
            </li>
            <li className={ this.isPathActive('/product') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/product">
                <i className="mdi mdi-book-multiple menu-icon"></i>
                <span className="menu-title">Product</span>
              </Link>
            </li>
            <li className={ this.isPathActive('/vendor') ? 'nav-item active' : 'nav-item' }>
              <Link className="nav-link" to="/vendor">
                <i className="mdi mdi-office-building menu-icon"></i>
                <span className="menu-title">Vendor</span>
              </Link>
            </li>
            <li className={ this.isPathActive('/login') ? 'nav-item active' : 'nav-item' } onClick={this.handleLogout}>
              <Link className="nav-link" to="/login">
                <i className="mdi mdi-key menu-icon"></i>
                <span className="menu-title">Logout</span>
              </Link>
            </li>
            {/*<li className={ this.isPathActive('/icons') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/icons/font-awesome">*/}
            {/*    <i className="mdi mdi-account-box-outline menu-icon"></i>*/}
            {/*    <span className="menu-title">Icons</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/charts') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/charts/chart-js">*/}
            {/*    <i className="mdi mdi-chart-line menu-icon"></i>*/}
            {/*    <span className="menu-title">Charts</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/user-pages') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">*/}
            {/*    <i className="mdi mdi-lock-outline menu-icon"></i>*/}
            {/*    <span className="menu-title">User Pages</span>*/}
            {/*    <i className="menu-arrow"></i>*/}
            {/*  </div>*/}
            {/*  <Collapse in={ this.state.userPagesMenuOpen }>*/}
            {/*    <ul className="nav flex-column sub-menu">*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/blank-page') ? 'nav-link active' : 'nav-link' } to="/user-pages/blank-page">Blank Page</Link></li>*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/login-1">Login</Link></li>*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/register-1">Register</Link></li>*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/user-pages/error-404">404</Link></li>*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/user-pages/error-500">500</Link></li>*/}
            {/*    </ul>*/}
            {/*  </Collapse>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*  <a className="nav-link" href="http://www.bootstrapdash.com/demo/star-admin-free/react/documentation/documentation.html" rel="noopener noreferrer" target="_blank">*/}
            {/*    <i className="mdi mdi-file-outline menu-icon"></i>*/}
            {/*    <span className="menu-title">Documentation</span>*/}
            {/*  </a>*/}
            {/*</li>*/}
          </ul>
        </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);