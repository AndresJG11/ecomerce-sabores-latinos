import {FC, useState} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import {CategoryManagement, ParameterManagement, ProductManagement} from 'admin/views/system-management/components'

import './admin-system-management-styles.css'

export const AdminSystemManagement : FC = () => {

    const [key, setKey] = useState<string | null>('productos');
    
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            className="admin-manager--tabs"
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="productos" title="Productos">
                <div className="p-3">
                    <ProductManagement />
                </div>
            </Tab>
            <Tab eventKey="categorias" title="Categorías">
                <div className="p-3">
                    <CategoryManagement />
                </div>
            </Tab>
            <Tab eventKey="parametros" title="Parámetros">
                <div className="p-3">
                    <ParameterManagement />
                </div>
            </Tab>
        </Tabs>
    );
}
