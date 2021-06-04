import axios from "axios";

export const newsAPI = {
    getNews(pageSize:number, page:number) {
        return axios.get(`https://newsapi.org/v2/top-headlines?
        country=us&category=business&pageSize=${pageSize}&page=${page}&apiKey=093a56ef92584facb242b343607a0bad`)
        /* return axios.get(`http://hn.algolia.com/api/v1/search?hitsPerPage=${pageSize}&page=${page}`)*/
    },
    searchNews(pageSize: number, searchValue:string) {
        return axios.get(`https://newsapi.org/v2/top-headlines?pageSize=${pageSize}&q=${searchValue}
        &apiKey=093a56ef92584facb242b343607a0bad`)
        /* return axios.get(`http://hn.algolia.com/api/v1/search?query=${searchValue}&hitsPerPage=${pageSize}`)*/
    }

}