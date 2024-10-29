import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LocalStore from '../../../Store/LocalStore'

export default function CsrStack() {
 
    return (
        <>
            <Outlet />
        </>
    )
}
