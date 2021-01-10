import {FC, useState} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import {CategoryManagement, ParameterManagement, ProductManagement} from 'admin/views/system-management/components'

import './admin-system-management-styles.css'

export const AdminSystemManagement : FC = () => {

    const [key, setKey] = useState<string | null>('categorias');
    
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            className="system-manager--tabs"
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="productos" title="Productos">
                <ProductManagement />
            </Tab>
            <Tab eventKey="categorias" title="Categorías">
                <CategoryManagement />
            </Tab>
            <Tab eventKey="parametros" title="Parámetros">
                <ParameterManagement />
            </Tab>
        </Tabs>
    );
}
