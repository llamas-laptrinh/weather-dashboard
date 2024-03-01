import React from 'react'
import styles from "./styles.module.css"
import { ForecastItem } from '../../../types/common'
import WeekWeatherItemComponent from './WeekWeatherItemComponent'
const WeekWeather: React.FC<ForecastItem[]> = (props) => {
    return (
        <div className={styles.styles} >
            <p className={styles.bold}>7-DAY FORECAST</p>
            {
                props.d.map((item) => {
                    return (<WeekWeatherItemComponent {...item} />)
                })
            }
        </div >
    )
}

export default WeekWeather;
