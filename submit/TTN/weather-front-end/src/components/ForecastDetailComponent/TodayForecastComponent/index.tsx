import React from 'react'
import styles from './styles.module.css'
import { ForecastItem } from '../../../types/common'
import TodayForecastItem from './TodayForeCastItem'
const TodayForecastComponent: React.FC<ForecastItem[]> = (props) => {
    return (
        <div className={styles.styles}>
            <p>TODAY'S FORECAST</p>
            <div className={styles.todayForecast}>
                {props.ForecastItem.map((item, index) => {
                    return <div>
                        {index != 0 &&
                            <div className={styles.Divider}><TodayForecastItem {...item}></TodayForecastItem></div>
                        }
                        {index == 0 &&
                            <TodayForecastItem {...item}></TodayForecastItem>
                        }

                    </div>
                })}
            </div>
        </div>
    )
}

export default TodayForecastComponent
