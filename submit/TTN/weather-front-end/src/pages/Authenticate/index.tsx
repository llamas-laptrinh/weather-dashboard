import { Col, Row } from 'antd'
import logo from '../../assets/icon.png';
import styles from './styles.module.css'
import { Navigate, Outlet } from 'react-router-dom';

export default function Authenticate() {
    if (localStorage.getItem('token')) {
        return <Navigate to="/" />
    }
    return (
        <Row>
            <Col span={12}>
                <div className={styles.leftSide}>
                    <img src={logo} alt="img" />
                </div >
            </Col >
            <Col span={12}>
                <Outlet></Outlet>
            </Col>
        </Row >
    )
}
