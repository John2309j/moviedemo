import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieHome=()=>{

    const [MoviesList,SetMoviesList]=useState([])
    const [SearchKeyword,SetSearchKeyword]=useState([])
    const [Page,SetPage]=useState(1)
    const [ShowLoader,SetShowLoader]=useState(false)

    const GetMoviesList=async(page=0,SearchKeyword='')=>{

        let Endpoint='';

        if(SearchKeyword!=='')
        {
            Endpoint='https://api.themoviedb.org/3/search/movie?query='+SearchKeyword+'&page='+page+''
        }
        else{
            Endpoint= 'https://api.themoviedb.org/3/discover/movie?page='+page+''
        }
    
        SetPage(page)
        SetShowLoader(true)
        try{

            const response=await axios.get(Endpoint,{
                headers:{
                    Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGI3MTQ4YjA2YjI1MDNiODNiZGJiMmVkOGFjMzRiYiIsIm5iZiI6MTcyMzczMDk5My40ODE1OTUsInN1YiI6IjY2YmUwYmU3YmRlYWY3NmQxZWUxNDY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PIjLMjNPci6LhNOAw0k0AoTOPS3Odu6-jxPzZVLj0xc'
                }
            })
            SetShowLoader(false)
            if(response.data)
            {
                SetMoviesList(MoviesList => [...MoviesList, ...response.data.results]);
            }

        }catch(err)
        {
            SetShowLoader(false)
            console.log(err)
        }
        
      
    }
    useEffect(()=>{
        GetMoviesList(1)
    },[])


    const handleScroll=(e)=>{
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            let Currentpage=Page;
            let NextPage=Currentpage+1;
            if(SearchKeyword!=='')
            {
                GetMoviesList(NextPage,SearchKeyword)
            }
            else{
                GetMoviesList(NextPage)
            }
          
        }
    }
    const SearchByKeyword=()=>{
        SetMoviesList([])
        GetMoviesList(1,SearchKeyword)
   
    }

    return (
        <>
        <div>
            <input type="text" placeholder="search title" onChange={(e)=>{SetSearchKeyword(e.target.value)}} onBlur={SearchByKeyword}/>
        </div>
        <div className="movie_figure_overall_wrap" onScroll={handleScroll}>

            {
             MoviesList.map((element)=>(
                <figure class="movie">
                <div class="movie__hero">
                  <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+element.poster_path} alt="Rambo" class="movie__img" />
                </div>
                <div class="movie__content">
                  <div class="movie__title">
                    <h1 class="heading__primary">{element.title} </h1>
                    
                  </div>
             
                  <div class="movie__details">
                    <p class="movie__detail"><span class="icons icons-red"> </span>
                      Released On: {element.release_date}</p>
                 
                  </div>
                </div>
          
              </figure>

             ))   
            }
      

  
        </div>
        {
            ShowLoader===true ?   <div className="loader_class"><i class="fa fa-circle-o-notch fa-spin" style={{fontSize:'24px'}}></i></div>:null
        }
      
        
        </>
    )

}
export default MovieHome