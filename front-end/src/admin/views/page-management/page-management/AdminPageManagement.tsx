import {useState, VFC} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { BannerManagement } from '../components';

export const AdminPageManagement : VFC = () => {

    const [key, setKey] = useState<string | null>('banner');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            className="admin-manager--tabs"
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="banner" title="Banner">
                <div className="p-3">
                    <BannerManagement />
                </div>
            </Tab>
  
        </Tabs>
    )
}
