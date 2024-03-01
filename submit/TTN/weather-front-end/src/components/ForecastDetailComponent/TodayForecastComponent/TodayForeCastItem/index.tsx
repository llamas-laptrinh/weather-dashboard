import React from 'react'
import styles from './styles.module.css'
import { ForecastItem } from '../../../../types/common'

const TodayForecastItem: React.FC<ForecastItem> = (props) => {
    return (
        <div className={styles.styles}>
            <p>{props.time?.getHours()} : 00</p>
            <img src={props.iconUrl} alt="" />
            <p className={styles.temperatureStyles}>{props.temperature}°</p>
        </div>
    )
}

export default TodayForecastItem
