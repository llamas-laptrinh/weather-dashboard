export interface SidebarComponentProps {
  title?: string;
  icon?: React.ReactElement;
  link: string;
}

export interface ForecastItem {
  time?: Date;
  weekDay: string;
  description?: string;
  iconUrl?: string;
  temperature?: number;
  minTemp?: number;
  maxTemp?: number;
  weather?: string;
  feelLike?: number;
  humidity?: number;
  windDeg?: number;
  windSpeed?: number;
}

export interface WeartherDetailProps {
  city?: string;
  List?: ForecastItem[];
}

export interface IWeatherListDetail {
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    feels_like: number;
  };
  weather: [
    {
      description: string;
      main: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherAPIResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherListDetail[];
  city: {
    name: string;
  };
}

export interface ICityData {
  name: string;
  lat: number;
  lon: number;
}

export interface ISearch {
  search: string;
  user_id: number;
}
