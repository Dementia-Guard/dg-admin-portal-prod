import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LocalStore from '../../../Store/LocalStore'

export default function VendorStack() {
    
    return (
        <>
            <Outlet />
            {/* <Dashboard/> */}
            {/* <Products/> */}
            {/* <Categories/> */}
            {/* <Orders/> */}
            {/* <Sellers/> */}
            {/* <Customers/> */}
            {/* <Reviews/> */}
            {/* <AddProducts/> */}
            {/* <AddCategory/> */}
            {/* <AddCustomers/> */}
            {/* <AddSeller/> */}
            {/* <Profile/> */}
            {/* <AppNotifications/> */}
        </>
    )
}
