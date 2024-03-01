import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Col, Row } from 'antd'
// import data from '../../api/cityData.json';
// import WeatherData from '../../api/data.json';
import { ICityData, ForecastItem, WeartherDetailProps } from '../../types/common';
import SearchCityComponent from './SearchCityComponent';
import ForecastDetailComponent from '../../components/ForecastDetailComponent';
import SearchHistoryService from '../../api/SearchHistoryService';
import WeatherService from '../../api/WeatherService';
import { IWeatherListDetail } from '../../types/common';

export default function SearchResults() {
    // const [CityData, setCityData] = useState<ICityData[]>([]);
    const [cityWeatherList, setCityWeatherList] = useState<WeartherDetailProps[]>([])
    const [displayData, setDisplayData] = useState<WeartherDetailProps>()
    const setDisplayDataFunction = (Data: WeartherDetailProps) => {
        setDisplayData(Data)
    }
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
            searchFunction(search)
            insertUrlParam('search', search)
            SearchHistoryService.store({ user_id: userObj.user_id, search: search })
                .then((res) => { console.log(res.data) })
                .catch((err) => { console.log(err) })
        }
    }
    function insertUrlParam(key: string, value: string) {
        if (window.history.pushState) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set(key, value);
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
            window.history.pushState({ path: newurl }, '', newurl);
        }
    }
    const searchFunction = (search: string) => {
        WeatherService.search(search)
            .then((res) => {
                const apiCalls = res.data.map((listItem: ICityData) => {

                    return WeatherService.getAll(listItem.lat, listItem.lon).then((res) => res.data);
                });
                Promise.all(apiCalls)
                    .then(results => {
                        const cityWeatherListTemp: WeartherDetailProps[] = [];
                        for (let i = 0; i < results.length; i++) {
                            console.log(results[i])
                            const myData: ForecastItem[] = results[i].list.map(function (item: IWeatherListDetail) {
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
                            cityWeatherListTemp.push({
                                city: results[i].city.name,
                                List: todayData
                            })
                        }
                        console.log(cityWeatherListTemp);

                        setCityWeatherList(cityWeatherListTemp);
                        // console.log('-------', typeof (cityWeatherList[0].List))

                    })
                    .catch(error => {
                        console.error('Error during API calls:', error);
                    });
            })
            .catch((err) => { console.log(err) })

    }
    useEffect(() => {
        const url = window.location.search;
        const param = url.replace("?search=", ''); // remove the ?
        if (param) {
            searchFunction(param)
        }
        else {
            searchFunction('London')
        }
    }, [])
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
            <Row>
                <Col lg={{ span: 10 }} span={24}>
                    {cityWeatherList.map(city => {
                        return (
                            <div>
                                <SearchCityComponent WeatherData={city} click={setDisplayDataFunction}></SearchCityComponent>
                            </div>
                        )
                    })}</Col>
                <Col lg={{ span: 10 }}>
                    <div className={styles.disappear}>
                        <ForecastDetailComponent {...displayData}></ForecastDetailComponent>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
