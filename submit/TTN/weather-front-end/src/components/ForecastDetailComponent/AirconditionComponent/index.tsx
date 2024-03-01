import React from 'react'
import styles from './styles.module.css'
import { ForecastItem } from '../../../types/common'
import { Col, Row } from 'antd'
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";
const AirConditionComponent: React.FC<ForecastItem> = (props) => {
    return (
        <div className={styles.styles}>
            <p>AIR CONDITIONS</p>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={3}>
                            <FaTemperatureHigh className={styles.iconStyles} />
                        </Col>
                        <Col span={21}>
                            <p>Real Feel</p>
                            <p className={styles.data}>{props.data.feelLike}°</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>
                            <WiHumidity className={styles.iconStyles} />
                        </Col>
                        <Col span={21}>
                            <p>Humidity</p>
                            <p className={styles.data}>{props.data.humidity}</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={3}>
                            <FaWind className={styles.iconStyles} />
                        </Col>
                        <Col span={21}>
                            <p>Wind</p>
                            <p className={styles.data}>{props.data.windSpeed} km/h</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>
                            <GiWindsock className={styles.iconStyles} />
                        </Col>
                        <Col span={21}>
                            <p>Wind degree</p>
                            <p className={styles.data}>{props.data.windDeg}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AirConditionComponent
