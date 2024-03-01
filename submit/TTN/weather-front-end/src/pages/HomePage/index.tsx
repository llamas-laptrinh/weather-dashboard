import React from "react";
import {
    Outlet,
} from "react-router-dom";
import SidebarComponent from "../../components/Sidebar";
import { Layout } from 'antd';


const { Content, Sider } = Layout;


const HomePage: React.FC = () => {
    return (
        <Layout >
            <Layout>
                <Sider breakpoint="lg" width={200} collapsedWidth="0" style={{ backgroundColor: "#0b131e" }}>
                    <SidebarComponent></SidebarComponent>
                </Sider>
                <Layout>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>


    );
};

export default HomePage;

