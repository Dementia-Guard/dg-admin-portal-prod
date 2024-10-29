import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'

export default function SiedBar({user}) {
    return (
        <nav className="navbar-vertical-nav d-none d-xl-block">
            <div className="navbar-vertical">
                <div className="px-4 py-5">
                    <NavLink to={`/app/${user.Role.toLowerCase()}/dashboard`} end={true} className="navbar-brand">
                        <img className='w-75' src="/assets/images/logo/freshcart-logo.png" alt="Logo" />
                    </NavLink>
                </div>
                <div className="navbar-vertical-content flex-grow-1" data-simplebar>
                    <ul className="navbar-nav flex-column" id="sideNavbar">
                        {/* Common items for all roles */}
                        <li className="nav-item">
                            <NavLink end={true} to={`/app/${user.Role.toLowerCase()}/dashboard`} className="nav-link">
                                <div className="d-flex align-items-center">
                                    <span className="nav-link-icon"><i className="fa-solid fa-dashboard" /></span>
                                    <span className="nav-link-text">{user.Role.toLowerCase()} Dashboard</span>
                                </div>
                            </NavLink>
                        </li>
                        <hr className='bordered' />

                        {/* Conditional Rendering Based on User Role */}
                        {user.Role === 'ADMIN' && (
                            <>
                               <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/customers`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-people-group" /></span>
                                            <span className="nav-link-text">Users</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/products`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-shopping-cart" /></span>
                                            <span className="nav-link-text">Products</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/categories`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-list" /></span>
                                            <span className="nav-link-text">Categories</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/orders`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-bag-shopping" /></span>
                                            <span className="nav-link-text">Orders</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/sellers`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-shop" /></span>
                                            <span className="nav-link-text">Sellers / Vendors</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {user.Role === 'VENDOR' && (
                            <>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/products`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-shopping-cart" /></span>
                                            <span className="nav-link-text">My Products</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/orders`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-bag-shopping" /></span>
                                            <span className="nav-link-text">My Orders</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {user.Role === 'CSR' && (
                            <>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/customers`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-people-group" /></span>
                                            <span className="nav-link-text">User Management</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/app/${user.Role.toLowerCase()}/orders`} className="nav-link">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="fa-solid fa-bag-shopping" /></span>
                                            <span className="nav-link-text">Order Management</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Common profile and logout items */}
                        <hr className='bordered' />
                        <li className="nav-item">
                            <NavLink to={'/app/profile'} className="nav-link">
                                <div className="d-flex align-items-center">
                                    <span className="nav-link-icon"><i className="fa-solid fa-user" /></span>
                                    <span className="nav-link-text">Profile</span>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link w-100">
                                <div className="d-flex align-items-center">
                                    <span className="nav-link-icon"><i className="fa-solid fa-share" /></span>
                                    <span className="nav-link-text">Share</span>
                                </div>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link w-100">
                                <div className="d-flex align-items-center">
                                    <span className="nav-link-icon"><i className="fa-solid fa-lock" /></span>
                                    <span className="nav-link-text">Logout</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
