import '../Styles/AllArticles.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useState, useEffect} from 'react'



type AllArticlesProps = {
    username: string | null
}

const AllArticles = (props: AllArticlesProps) => {

    const [Articles, setArticles] = useState<Array <any | null>>([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}v1/getallarticles`)
        .then(res => setArticles(res.data))
    }, [])

    

    console.log(Articles)

    return(
        <div>

                <section className='AllFirstArticlesSection'>
                    
                    <div className='IntroFrontLinear'></div>
                    <div className='Bubble'></div>
                    <div className='Bubble2'></div>
                    <div className='Bubble3'></div>
                    <div className='Bubble4'></div>
                    <div className='Bubble5'></div>
                    <div className="custom-shape-divider-bottom-1639425832">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" className="shape-fill"></path>
                        </svg>
                    </div>

                    <div className='SectionInfo'>

                        <h1>{props.username ? props.username : 'Guest'}, Looking for a new articles?</h1>
                        <p>Try to get some experience from the others, Read their articles.</p>
                        
                    </div>
                </section>


                <h1>All Articles</h1>

                <div className='ArticlesContainer'>

                    {
                        Articles.map((e, key)=>{
                            return(
                                <div className='Article' key={key}>
                                    <Link to={`/Article/${e.title.replace(/\s/g, '_')}`}>{e.title.length > 55 ? e.title.slice(0, 55) + '...' : e.title}</Link>
                                    <p>{e.articleText.length > 191 ? e.articleText.slice(0, 191) + '...' : e.articleText}</p>
                                    <div className='ArticlesSpans'>
                                    <span>{e.date}</span>
                                    <span>{e.username}</span>
                                    </div>
                                </div>   

                            )
                        })
                    }

                     
                     
                </div>

        </div>
    )
}


export default AllArticles;