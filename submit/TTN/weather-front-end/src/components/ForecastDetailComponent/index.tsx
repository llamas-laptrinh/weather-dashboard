import React from 'react'
import styles from './styles.module.css'
import { WeartherDetailProps } from '../../types/common'
import { Row, Col } from 'antd'
import TodayForecastComponent from './TodayForecastComponent'
import AirConditionComponent from './AirconditionComponent'

const ForecastDetailComponent: React.FC<WeartherDetailProps> = (props) => {

    if (!props.List)
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    return (
        <div className={styles.styles}>
            <Row>
                <Col span={12}>
                    <div className={styles.detailStyles}>
                        <h3 className={styles.cityStyles}>{props.city}</h3>
                        <p className={styles.lighterColor}>{props.List[0].description}</p>
                        <h3 className={styles.temperatureStyles}>{props.List[0].temperature}°</h3>
                    </div>
                </Col>
                <Col span={12}>
                    <img className={styles.imgStyles} src={props.List[0].iconUrl} alt="weater icon" />
                </Col>
            </Row>
            <Row>
                <TodayForecastComponent ForecastItem={props.List} />
                <AirConditionComponent data={props.List[0]}></AirConditionComponent>
            </Row>
        </div>
    )
}
export default ForecastDetailComponent;