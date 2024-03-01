import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import WeekWeather from './WeekWeather'
import ForecastDetailComponent from '../../components/ForecastDetailComponent'
import { ForecastItem, WeatherAPIResponse, WeartherDetailProps } from '../../types/common'
import styles from "./styles.module.css"
import WeatherService from '../../api/WeatherService'
// import data from '../../api/data.json';
import SearchHistoryService from '../../api/SearchHistoryService'

const WeatherPage: React.FC = () => {
    // const [data, setData] = useState<WeatherAPIResponse | null>(null);
    const [fiveDaysData, setfiveDaysData] = useState<ForecastItem[]>([]);
    const [todayDataProps, settodayDataProps] = useState<WeartherDetailProps | null>(null);

    const [search, setSearch] = useState("")

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }
    const handlerFuntion = () => {
        const user = localStorage.getItem('user');
        let userObj = null
        if (user) {
            userObj = JSON.parse(user)
            console.log(userObj)
        }
        if (search) {
            SearchHistoryService.store({ user_id: userObj.user_id, search: search })
                .then((res) => { console.log(res.data) })
                .catch((err) => { console.log(err) })
        }
        window.location.href = `/search?query=${search}`;


    }
    useEffect(() => {
        WeatherService.getAll(16.0003995, 108.213038)
            .then((response) => {
                // setData(response.data);
                const data: WeatherAPIResponse = response.data
                if (data) {
                    const myData: ForecastItem[] = data.list.map(function (item) {
                        const [dateComponents, timeComponents] = item.dt_txt.split(' ');
                        const [year, month, day] = dateComponents.split('-');
                        const [hours, minutes, seconds] = timeComponents.split(':');
                        const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                        const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
                        const rs: ForecastItem = {
                            time: date,
                            weekDay: dayArray[date.getDay()],
                            iconUrl: "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png",
                            temperature: parseInt((item.main.temp - 272.15).toString()),
                            description: item.weather[0].description,
                            minTemp: parseInt((item.main.temp_min - 272.15).toString()),
                            maxTemp: parseInt((item.main.temp_max - 272.15).toString()),
                            weather: item.weather[0].main,
                            humidity: item.main.humidity,
                            windSpeed: item.wind.speed,
                            feelLike: parseInt((item.main.feels_like - 272.15).toString()),
                            windDeg: item.wind.deg,
                        }
                        return rs
                    })
                    const todayData = myData.filter(function (item) {
                        const d = new Date();
                        const currentday = d.getDate();
                        return item.time?.getDate() == currentday
                    })
                    settodayDataProps({
                        city: data.city.name,
                        List: todayData
                    })
                    console.log('hello', todayDataProps)
                    const fiveDaysDataTemp = [myData[0]]
                    for (let i = 0; i < myData.length; i++) {
                        if (fiveDaysDataTemp[fiveDaysDataTemp.length - 1].time?.getDate() != myData[i].time?.getDate()) {
                            fiveDaysDataTemp.push(myData[i])
                        }
                    }
                    setfiveDaysData(fiveDaysDataTemp);
                }

            })
            .catch((e: Error) => {
                console.log(e);
            });

    }, [])
    // useEffect(() => {

    //     const myData: ForecastItem[] = data.list.map(function (item) {
    //         const [dateComponents, timeComponents] = item.dt_txt.split(' ');
    //         const [year, month, day] = dateComponents.split('-');
    //         const [hours, minutes, seconds] = timeComponents.split(':');
    //         const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    //         const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    //         const rs: ForecastItem = {
    //             time: date,
    //             weekDay: dayArray[date.getDay()],
    //             iconUrl: "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png",
    //             temperature: parseInt((item.main.temp - 272.15).toString()),
    //             description: item.weather[0].description,
    //             minTemp: parseInt((item.main.temp_min - 272.15).toString()),
    //             maxTemp: parseInt((item.main.temp_max - 272.15).toString()),
    //             weather: item.weather[0].main,
    //             humidity: item.main.humidity,
    //             windSpeed: item.wind.speed,
    //             feelLike: parseInt((item.main.feels_like - 272.15).toString()),
    //             windDeg: item.wind.deg,
    //         }
    //         return rs
    //     })
    //     const todayData = myData.filter(function (item) {
    //         const d = new Date(2024, 2, 13);
    //         const currentday = d.getDate();
    //         return item.time?.getDate() == currentday
    //     })
    //     settodayDataProps({
    //         city: data.city.name,
    //         List: todayData
    //     })
    //     const fiveDaysDataTemp = [myData[0]]
    //     for (let i = 0; i < myData.length; i++) {
    //         if (fiveDaysDataTemp[fiveDaysDataTemp.length - 1].time?.getDate() != myData[i].time?.getDate()) {
    //             fiveDaysDataTemp.push(myData[i])
    //         }
    //     }
    //     setfiveDaysData(fiveDaysDataTemp);
    // }, [data])


    return (
        <div className={styles.bg}>
            <Row>
                <Col span={14}>
                    <input className={styles.searchStyles} type="text" placeholder='Search city, location...' onChange={handleSearchChange} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handlerFuntion();
                        }
                    }} />
                </Col>
                <Col span={10}>
                </Col>
            </Row>
            <Row style={{}}>
                <Col span={14}>
                    <ForecastDetailComponent {...todayDataProps}></ForecastDetailComponent>
                </Col>
                <Col span={10}>
                    <WeekWeather d={fiveDaysData}></WeekWeather>
                </Col>
            </Row>
        </div>
    )
}

export default WeatherPage
