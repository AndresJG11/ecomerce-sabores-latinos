import {FC} from 'react'
import { AdminSideBar } from 'admin'

import './admin-layout-styles.css'


interface AdminLayoutProps{
    readonly children: any
}

export const AdminLayout : FC<AdminLayoutProps> = ({children}) => {
    return (
        <div className="row admin-layout--container">
            <div className="col-2 sidebar">
                <AdminSideBar />
            </div>
            <div className="col-10 content">
                <div className="content-children">
                    {children}
                </div>
            </div>
        </div>
    )
}
