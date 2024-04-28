import React from 'react'
import { useParams, NavLink, useSearchParams, useLocation } from "react-router-dom";
import movies from '../MovieList'
import './Movie.css'

function Movie(){
    const params = useParams();
    let [searchParams, setSearchParams] = useSearchParams()
    const applyActiveColor = ({ isActive }) => (isActive ? {color: 'orangered'} : {})

    const changeQueryString = (e) => {
        const filter = e.target.value
        if(filter){
            setSearchParams({ filter })
        }else{
            setSearchParams({})
        }
    }
    const QueryNavLink = ({ to, children, ...props }) => {
        const location = useLocation();
        console.log(location)
        return <NavLink to={to + location.search} {...props}>{children}</NavLink>
    }
    // 필터링된 목록으로 렌더링하기
    const moviesFiltered = movies
    .filter( movie => {
        const filter = searchParams.get('filter')
        if(!filter) return true;
        const title = movie.title.toLowerCase()
        return title.includes(filter.toLowerCase())
    })
    const movie = moviesFiltered[params.movieId] // 필터링된 목록에서 특정 포스트 글 선택하기
    return (
        <>
            {/* 쿼리스트링을 이용한 검색 */}
            <br/><input className="filter-movie" value={searchParams.get('filter') || ""} onChange={changeQueryString} placeholder="Search movie ..."/>

            {/* 특정 영화 */}
            {movie ? 
                <div className="movie-container">
                    <h1>{movie.title}</h1>
                    <img>{movie.small_cover_image}</img>
                    <p>{movie.summary}</p>
                    <span>{movie.genres}</span>
                </div>   :
                <h1>MOVIE PAGE</h1>}

            {/* 영화 전체목록  */}
            {moviesFiltered
            .map( (movie, id) => {
                return (
                    <QueryNavLink key={id} to={`/movies/${id}`} className="movie-item" style={applyActiveColor}>{movie.title}</QueryNavLink>
                )
            })}
        </>
    )
}
export default Movie