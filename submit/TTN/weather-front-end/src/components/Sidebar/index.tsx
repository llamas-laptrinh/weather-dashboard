import { NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { GrMapLocation } from "react-icons/gr";
import { TiWeatherPartlySunny } from "react-icons/ti";
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import MenuItemComponent from './MenuItemComponent';
import { SidebarComponentProps } from '../../types/common';
import logo from '../../assets/icon.png';
import { Link } from 'react-router-dom';
const SidebarComponent: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
    }, [])
    const logoutFunction = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false)
    }
    const items: SidebarComponentProps[] = [{
        icon: <TiWeatherPartlySunny />,
        title: 'Weather',
        link: "./"
    },
    {
        icon: <GrMapLocation />,
        title: 'Cities',
        link: "./search"
    },
    {
        icon: <UserOutlined />,
        title: 'Search History',
        link: "./searchhistory"

    },
    {
        icon: <NotificationOutlined />,
        title: 'Notifications',
        link: "./search"
    }]

    const noLoggedInItems: SidebarComponentProps[] = [{
        icon: <TiWeatherPartlySunny />,
        title: 'Weather',
        link: "./"
    },
    {
        icon: <GrMapLocation />,
        title: 'Cities',
        link: "./search"
    },
    ]

    return (
        <div className={[styles.menuContainer, styles.menuStyles].join(' ')}>
            <div className={styles.logoStyle}>
                <img src={logo} alt="img" />
            </div>
            {isLoggedIn ? items.map(item => {
                return <div className={styles.sideBarWidth}>
                    <MenuItemComponent title={item.title} icon={item.icon} link={item.link}></MenuItemComponent>
                </div>
            }) : noLoggedInItems.map(item => {
                return <div className={styles.sideBarWidth}>
                    <MenuItemComponent title={item.title} icon={item.icon} link={item.link}></MenuItemComponent>
                </div>
            })}
            {isLoggedIn ? <div className={styles.mt150}>
                <div className={styles.buttonContainerStyles}>
                    <button onClick={logoutFunction} className={styles.buttonStyles}>Logout</button>
                </div>
            </div> : <div className={styles.mt150}>
                <div className={styles.buttonContainerStyles}>
                    <Link to='./authenticate/login'><button onClick={logoutFunction} className={styles.buttonStyles}>Login</button></Link>
                </div> <div className={styles.buttonContainerStyles}>
                    <Link to='./authenticate/regist'><button onClick={logoutFunction} className={styles.buttonStyles}>Regist</button></Link>
                </div></div>}
        </div>
    )
}

export default SidebarComponent
