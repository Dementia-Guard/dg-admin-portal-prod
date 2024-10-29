import React from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'

export default function Customers() {
    return (
        <main className="main-content-wrapper">
            <div className="container">
                <BreadCrumb page={'Customers'} icon={'fa-user'}/>
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        <div className="card h-100 card">
                            <div className="p-6">
                                <div className="row justify-content-between">
                                    <div className="col-md-4 col-12">
                                        <form className="d-flex" role="search">
                                            <input className="form-control" type="search" placeholder="Search Customers" aria-label="Search" />
                                        </form>
                                    </div>
                                    <div className="col-md-2 col-12 text-end">
                                        <button className='btn btn-dark'>Add Customer</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue id="checkAll" />
                                                        <label className="form-check-label" htmlFor="checkAll" />
                                                    </div>
                                                </th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Purchase Date</th>
                                                <th>Phone</th>
                                                <th>Spent</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue id="customerOne" />
                                                        <label className="form-check-label" htmlFor="customerOne" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src="../assets/images/avatar/avatar-1.jpg" alt className="avatar avatar-xs rounded-circle" />
                                                        <div className="ms-2">
                                                            <a href="#" className="text-inherit">Bonnie Howe</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>bonniehowe@gmail.com</td>
                                                <td>17 May, 2023 at 3:18pm</td>
                                                <td>-</td>
                                                <td>$49.00</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="feather-icon icon-more-vertical fs-5" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="bi bi-trash me-3" />
                                                                    Delete
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="bi bi-pencil-square me-3" />
                                                                    Edit
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Paginator/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}
