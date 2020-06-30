import React, {useEffect} from "react";
import NewsHN from "./NewsHN";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../component/common/Preloader";
import {getNews, searchNews, setPageNewsNumber, setPageSize} from "../redux/news-reducer";


const NewsContainer = () => {
    const isLoading = useSelector(state => state.newsPage.isLoading)
    const totalResults = useSelector(state => state.newsPage.totalResults)
    const articles = useSelector(state => state.newsPage.articles)
    const pageSize = useSelector(state => state.newsPage.pageSize)
    const currentPage = useSelector(state => state.newsPage.currentPage)
    const optionsForNews = useSelector(state => state.newsPage.optionsForNews)
    const messageError = useSelector(state => state.newsPage.messageError)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNews(pageSize,currentPage))
    },[pageSize,currentPage])

    const onPageNewsChanged = (pageNumber) => {
        dispatch(setPageNewsNumber(pageNumber))
    }

    const handlePageSize = (value) => {
        dispatch(setPageSize(value))
    }

    const handleSearchNews = (searchValue) => {

        dispatch(searchNews(pageSize,searchValue))
    }



    return<>
        {isLoading ? <Preloader/> : null}
        <NewsHN totalResults={totalResults}
              articles={articles}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageNewsChanged={onPageNewsChanged}
              optionsForNews={optionsForNews}
              handlePageSize={handlePageSize}
              handleSearchNews={handleSearchNews}
              messageError={messageError}

        />
    </>

}

export default NewsContainer;