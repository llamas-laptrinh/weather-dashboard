import http from "../common/OwnAPI";
// import api from OwnAPI
// import ITutorialData from "../types/Tutorial";
import { ISearch } from "../types/common";

const getAll = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  let userObj = null;
  if (user) {
    userObj = JSON.parse(user);
  }
  return http.get("/searchHistory?user_id=" + userObj.user_id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const store = (data: ISearch) => {
  const token = localStorage.getItem("token");
  return http.post("/searchHistory", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// const get = (id: any) => {
//   return http.get<ITutorialData>(`/tutorials/${id}`);
// };

// const create = (data: ITutorialData) => {
//   return http.post<ITutorialData>("/tutorials", data);
// };

// const update = (id: any, data: ITutorialData) => {
//   return http.put<any>(`/tutorials/${id}`, data);
// };

const remove = (id: number) => {
  const token = localStorage.getItem("token");

  return http.delete(`/searchHistory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// const removeAll = () => {
//   return http.delete<any>(`/tutorials`);
// };

// const findByTitle = (title: string) => {
//   return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
// };

const SearchHistoryService = {
  getAll,
  store,
  remove,
  //   get,
  //   create,
  //   update,
  //   remove,
  //   removeAll,
  //   findByTitle,
};

export default SearchHistoryService;
