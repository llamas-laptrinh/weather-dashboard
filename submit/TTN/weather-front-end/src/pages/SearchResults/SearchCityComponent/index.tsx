import React, { useState } from 'react'
import { WeartherDetailProps } from '../../../types/common';
import styles from "./styles.module.css"
import { Col, Row } from 'antd';
import ForecastDetailComponent from '../../../components/ForecastDetailComponent';

interface NewWeatherDetailProps {
    WeatherData: WeartherDetailProps;
    click: (data: WeartherDetailProps) => void;
}


const SearchCityComponent: React.FC<NewWeatherDetailProps> = (props) => {
    const { WeatherData, click } = props;
    const [isFocus, setIsFocus] = useState(false);
    const handleClick = () => {
        click(WeatherData)
        if (isFocus) setIsFocus(false);
        else setIsFocus(true);
    }
    if (!WeatherData.List)
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    return (
        <div>
            <div id='container' className={styles.styles} onClick={handleClick}>
                <Row>
                    <Col span={6}>
                        <img className={styles.iconStyles} src={WeatherData.List[0].iconUrl} alt="weater icon" />
                    </Col>
                    <Col span={15}  >
                        <p className={styles.cityName}>{WeatherData.city}</p>
                        {/* <p>{WeatherData.}</p> */}
                        <p>{WeatherData.List[0].time?.getHours()}:00</p>
                    </Col>
                    <Col span={3}>
                        <p className={styles.tempStyles}>{WeatherData.List[0].temperature}°</p>
                    </Col>
                </Row>
            </div>
            {isFocus ? <div className={styles.disappear}>
                <ForecastDetailComponent {...WeatherData}></ForecastDetailComponent>
            </div> : <></>}
        </div>

    )
}

export default SearchCityComponent;
