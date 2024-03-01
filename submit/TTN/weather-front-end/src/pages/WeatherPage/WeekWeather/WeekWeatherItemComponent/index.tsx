import React from 'react'
import styles from './styles.module.css'
import { ForecastItem } from '../../../../types/common'
import { Col, Row } from 'antd'

const WeekWeatherItemComponent: React.FC<ForecastItem> = (props) => {
    return (
        <div className={styles.styles}>
            <Row className={styles.FullWidth}>
                <Col className={styles.DFlex} span={11}>
                    <p>{props.weekDay}</p>
                    <img src={props.iconUrl} className={styles.iconUrl} alt="icon" />
                </Col>
                <Col className={styles.DFlex} span={2}></Col>

                <Col className={styles.DFlex} span={11}>
                    <p className={styles.temperatureStyles}>{props.weather}</p>
                    <p>{props.maxTemp} / {props.minTemp}</p>
                </Col>

            </Row>
        </div>
    )
}

export default WeekWeatherItemComponent
