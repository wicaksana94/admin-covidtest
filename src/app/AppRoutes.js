import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Registrant = lazy(() => import('./dashboard/Registrant'));

const Clinic = lazy(() => import('./dashboard/Clinic'));
const AddClinic = lazy(() => import('./dashboard/AddClinic'));
const EditClinic = lazy(() => import('./dashboard/EditClinic'));

const Pricelist = lazy(() => import('./dashboard/Pricelist'));
const AddPricelist = lazy(() => import('./dashboard/AddPricelist'));
const EditPricelist = lazy(() => import('./dashboard/EditPricelist'));

const Product = lazy(() => import('./dashboard/Product'));
const AddProduct = lazy(() => import('./dashboard/AddProduct'));
const EditProduct = lazy(() => import('./dashboard/EditProduct'));

const Vendor = lazy(() => import('./dashboard/Vendor'));
const AddVendor = lazy(() => import('./dashboard/AddVendor'));
const EditVendor = lazy(() => import('./dashboard/EditVendor'));

const UserList = lazy(() => import('./dashboard/UserList'));
const AddUser = lazy(() => import('./dashboard/AddUserList'));
const EditUser = lazy(() => import('./dashboard/EditUserList'));

const UserAccess = lazy(() => import('./dashboard/UserAccess'));
const AddUserAccess = lazy(() => import('./dashboard/AddUserAccess'));
const EditUserAccess = lazy(() => import('./dashboard/EditUserAccess'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const FontAwesome = lazy(() => import('./icons/FontAwesome'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const MyProfile = lazy(() => import('./user-pages/MyProfile'));
const Register1 = lazy(() => import('./user-pages/Register'));

const BlankPage = lazy(() => import('./user-pages/BlankPage'));


class AppRoutes extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard}/>

                    <Route path="/dashboard/user_list" component={UserList}/>
                    <Route path="/dashboard/user_access" component={UserAccess}/>

                    <Route path="/form-Elements/basic-elements" component={BasicElements}/>
                    <Route path="/registrant" component={Registrant}/>

                    <Route path="/clinic" component={Clinic}/>
                    <Route path="/add_clinic" component={AddClinic}/>
                    <Route path="/edit_clinic/:id" component={EditClinic}/>

                    <Route path="/pricelist" component={Pricelist}/>
                    <Route path="/add_pricelist" component={AddPricelist}/>
                    <Route path="/edit_pricelist/:id" component={EditPricelist}/>

                    <Route path="/product" component={Product}/>
                    <Route path="/add_product" component={AddProduct}/>
                    <Route path="/edit_product/:id" component={EditProduct}/>

                    <Route path="/vendor" component={Vendor}/>
                    <Route path="/add_vendor" component={AddVendor}/>
                    <Route path="/edit_vendor/:id" component={EditVendor}/>

                    <Route path="/tables/basic-table" component={BasicTable}/>

                    <Route path="/icons/font-awesome" component={FontAwesome}/>

                    <Route path="/charts/chart-js" component={ChartJs}/>

                    <Route path="/user_list" component={UserList}/>
                    <Route path="/add_user" component={AddUser}/>
                    <Route path="/edit_user/:id" component={EditUser}/>

                    <Route path="/user_access" component={UserAccess}/>
                    <Route path="/add_user_access" component={AddUserAccess}/>
                    <Route path="/edit_user_access/:id" component={EditUserAccess}/>

                    <Route path="/my_profile" component={MyProfile}/>

                    <Route path="/user-pages/login-1" component={Login}/>
                    <Route path="/user-pages/register-1" component={Register1}/>

                    <Route path="/user-pages/error-404" component={Error404}/>
                    <Route path="/user-pages/error-500" component={Error500}/>

                    <Route path="/user-pages/blank-page" component={BlankPage}/>


                    <Redirect to="/dashboard"/>
                </Switch>
            </Suspense>
        );
    }
}

export default AppRoutes;