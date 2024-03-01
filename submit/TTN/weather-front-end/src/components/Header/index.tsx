import { Menu } from 'antd'
import React from 'react'

const HeaderComponent: React.FC = () => {

    const items = new Array(15).fill(null).map((_, index) => ({
        key: index + 1,
        label: `nav ${index + 1}`,
    }));

    return (
        <div>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
            />
        </div>
    )
}

export default HeaderComponent
