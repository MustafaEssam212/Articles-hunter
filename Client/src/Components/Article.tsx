import '../Styles/Article.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'


type ObjType = {
    _id: string,
    title: string,
    date: string,
    articleText: string,
    author: string,
    username: string
}

const Article = () =>{

    const param = useParams();
    var ArticleTitle:string | any = param.articletitle;
    const ArticleName = ArticleTitle.replace(/_/g, ' ');
    const [Article, setArticle] = useState<ObjType>({} as ObjType)
    useEffect(()=>{
        window.scrollTo(0, 0)
        axios.get(`${process.env.REACT_APP_API}v1/getarticle/${ArticleName}`)
        .then(res => setArticle(res.data))
    }, [])

    
    return(

        <>
                <section className='ArticleFirstSection'>
                    
                    <div className='IntroFrontLinear'></div>
                    <div className='Bubble'></div>
                    <div className='Bubble2'></div>
                    <div className='Bubble3'></div>
                    <div className='Bubble4'></div>
                    <div className='Bubble5'></div>
                    <div className="custom-shape-divider-bottom-1639592110">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
                        </svg>
                    </div>

                    <div className='ArticleSectionInfo'>

                        <h1>{Article.title}</h1>
                        
                        
                    </div>
                </section>
        

                <div className='ArticleDiv'>
                    <div className='ArticleInfoTop'>
                        <span>{Article.date}</span>
                        <span>{Article.username}</span>
                    </div>

                    <p className='ArticleText'>

                        {Article.articleText}

                    </p>

                </div>

        </>

    )
}

export default Article;