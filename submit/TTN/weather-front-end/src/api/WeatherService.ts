import http from "../common/OpenWeatherAPI";
// import api from OwnAPI
// import ITutorialData from "../types/Tutorial";
const appId = "3f9219dbaccae1111480fafc35ab2b2f";

const getAll = (lat: number, lon: number) => {
  return http.get(
    "/data/2.5/forecast?lat=" +
      lat.toString() +
      "&lon=" +
      lon.toString() +
      "&appid="+appId
  );
};

const search =(search:string)=>{
    return http.get(
      "geo/1.0/direct?q="+search+"&limit=5&appid="+appId
    );
}

// const get = (id: any) => {
//   return http.get<ITutorialData>(`/tutorials/${id}`);
// };

// const create = (data: ITutorialData) => {
//   return http.post<ITutorialData>("/tutorials", data);
// };

// const update = (id: any, data: ITutorialData) => {
//   return http.put<any>(`/tutorials/${id}`, data);
// };

// const remove = (id: any) => {
//   return http.delete<any>(`/tutorials/${id}`);
// };

// const removeAll = () => {
//   return http.delete<any>(`/tutorials`);
// };

// const findByTitle = (title: string) => {
//   return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
// };

const WeatherService = {
  getAll,
  search,
  //   get,
  //   create,
  //   update,
  //   remove,
  //   removeAll,
  //   findByTitle,
};

export default WeatherService;
