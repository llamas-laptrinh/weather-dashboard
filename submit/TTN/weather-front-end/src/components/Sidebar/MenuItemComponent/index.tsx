import React from 'react'
import styles from './styles.module.css'
import { SidebarComponentProps } from '../../../types/common'
import { Link } from 'react-router-dom';

const MenuItemComponent: React.FC<SidebarComponentProps> = (props) => {
    const linkTo: string = props.link;
    return (
        <Link to={linkTo}>
            <div className={styles.textCenter}>
                {props.icon}
                <p>{props.title}</p>
            </div>
        </Link>
    )
}

export default MenuItemComponent;
