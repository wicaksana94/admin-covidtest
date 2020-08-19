import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
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
        localStorage.clear();
        window.location.replace("/");
      }
    })
  };

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });


    const dropdownPaths = [
      {path:'/basic-ui', state: 'userMenuOpen'},
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

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  render () {
    let authorizedMenu = JSON.parse(localStorage.getItem("AuthorizedMenu"))
    let authorizedMenuList = authorizedMenu.map(function(list_data, index){
      function setActive(parameter) {
        // Clear all active class in the sidebar menu
        let findActiveElement = document.querySelector(".active");
        if(findActiveElement !==null){
          findActiveElement.classList.remove("active");
        }
        // Set active to clicked menu
        let element = document.getElementById(parameter);
        element.parentNode.classList.add("active");
      }
          return(
              <li className='nav-item' key={list_data.id}>
                <Link
                    className="nav-link"
                    to={list_data.path_name}
                    id={list_data.name+"_"+list_data.id}
                    onClick={() => setActive(list_data.name+"_"+list_data.id)}
                >
                  <i className={list_data.icon}></i>
                  <span className="menu-title">{list_data.name}</span>
                </Link>
              </li>
          )

    })
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
                        <img src={ require("../../assets/images/faces/noface.png")} alt="profile" />
                      </div>
                      <div className="text-left ml-3">
                        <p className="profile-name">{localStorage.getItem('fullName')}</p>
                        <small className="designation text-muted text-small">{localStorage.getItem('roleName')}</small>
                        {/*<span className="status-indicator online"></span>*/}
                      </div>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="preview-list navbar-dropdown">
                    <Link className="dropdown-item preview-item d-flex align-items-center text-small text-decoration-none text-dark" to="/my_profile">
                      <span>My Profile</span>
                    </Link>
                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={() => this.handleLogout()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/*<button className="btn btn-success btn-block">New Project <i className="mdi mdi-plus"></i></button>*/}
              </div>
            </li>
              {authorizedMenuList}
              <li className='nav-item' onClick={this.handleLogout}>
                <Link className="nav-link" to="#">
                  <i className="mdi mdi-key menu-icon"></i>
                  <span className="menu-title">Logout</span>
                </Link>
              </li>
            {/*<li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/dashboard">*/}
            {/*    <i className="mdi mdi-television menu-icon"></i>*/}
            {/*    <span className="menu-title">Dashboard</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/user_list') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/user_list">*/}
            {/*    <i className="mdi mdi-format-list-checkbox menu-icon"></i>*/}
            {/*    <span className="menu-title">User List</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/user_access') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/user_access">*/}
            {/*    <i className="mdi mdi-emoticon-happy menu-icon"></i>*/}
            {/*    <span className="menu-title">User Access</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/registrant') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/registrant">*/}
            {/*    <i className="mdi mdi-account menu-icon"></i>*/}
            {/*    <span className="menu-title">Registrant</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/clinic') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/clinic">*/}
            {/*    <i className="mdi mdi-hospital menu-icon"></i>*/}
            {/*    <span className="menu-title">Clinic</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/pricelist') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/pricelist">*/}
            {/*    <i className="mdi mdi-account-cash menu-icon"></i>*/}
            {/*    <span className="menu-title">Pricelist</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/product') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/product">*/}
            {/*    <i className="mdi mdi-book-multiple menu-icon"></i>*/}
            {/*    <span className="menu-title">Product</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/vendor') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <Link className="nav-link" to="/vendor">*/}
            {/*    <i className="mdi mdi-office-building menu-icon"></i>*/}
            {/*    <span className="menu-title">Vendor</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={ this.isPathActive('/user') ? 'nav-item active' : 'nav-item' }>*/}
            {/*  <div className={ this.state.userMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userMenuOpen') } data-toggle="collapse">*/}
            {/*    <i className="mdi mdi-emoticon-happy menu-icon"></i>*/}
            {/*    <span className="menu-title">User Management</span>*/}
            {/*    <i className="menu-arrow"></i>*/}
            {/*  </div>*/}
            {/*  <Collapse in={ this.state.userMenuOpen }>*/}
            {/*    <ul className="nav flex-column sub-menu">*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/user_list') ? 'nav-link active' : 'nav-link' } to="/user_list">User List</Link></li>*/}
            {/*      <li className="nav-item"> <Link className={ this.isPathActive('/user_access') ? 'nav-link active' : 'nav-link' } to="/user_access">User Access</Link></li>*/}
            {/*    </ul>*/}
            {/*  </Collapse>*/}
            {/*</li>*/}

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