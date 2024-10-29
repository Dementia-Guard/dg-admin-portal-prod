import React from 'react'
import SideBarCanvas from './SideBarCanvas/SideBarCanvas'
import SiedBar from './SideBar/SiedBar'
import { useAuth } from '../../Context/AuthContext'

export default function MainSideNav() {
  const { user } = useAuth()
  return (
      <>
          <SiedBar user={user}/>
          <SideBarCanvas user={user}/>
    </>
  )
}
