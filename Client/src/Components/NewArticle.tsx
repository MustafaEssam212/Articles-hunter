import '../Styles/NewArticle.css'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Notification from './Notification'

type NewArticleProps = {
    author: string,
    username: string
}

type ArticleType = {
    title: string,
    articleText: string,
    author: string,
    username: string
}

const NewArticle = (props: NewArticleProps) =>{


    
    
 
    

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])

    
    const [ArticleInfo, setArticleInfo] = useState<ArticleType>({author: props.author, username: props.username} as ArticleType);
    const [Success, setSuccess] = useState<Array<{msg: string}>>([]);
    const [Errors, setErrors] = useState< Array<{ msg: string, value?: string, param?: string, location?: string}> >([]);
    const [Show, setShow] = useState(false);
    

    useEffect(()=>{
        setErrors([])
        setSuccess([])
    }, [ArticleInfo])


    const handlePublish = ( z: React.FormEvent<HTMLFormElement>) => {
        z.preventDefault();
        
        
        axios.post(`${process.env.REACT_APP_API}v1/publisharticle`, {ArticleInfo})
        .then(res => {
            if(res.data.msg === 'Article Published'){
                setShow(true)
                setSuccess([{msg: res.data.msg}])
               let Input = document.getElementById('Input') as HTMLInputElement;
               Input.value = "";
               let TextArea = document.getElementById('TextArea') as HTMLTextAreaElement;
               TextArea.value = "";
            }else{
                setShow(true)
                setErrors(res.data)
                
            }
        })
    }

    return(

        <>

           

            <div className='NewArticleContainer'>

                <div className='NewPopNoti'>
                    <Notification show={Show} errors={Errors} success={Success} />
                </div>

                <section className='FirstArticleSection'>
            
                    <div className='IntroFrontLinear'></div>
                    <div className='Bubble'></div>
                    <div className='Bubble2'></div>
                    <div className='Bubble3'></div>
                    <div className='Bubble4'></div>
                    <div className='Bubble5'></div>
                    <div className="custom-shape-divider-bottom-1639403235">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                        </svg>
                    </div>

                    <div className='SectionInfo'>

                        <h1>Welcome {props.username}</h1>
                        <p>Publish your article, Make others benefit from your experince or your life events.</p>
                        
                    </div>
                </section>


                    <h1>Fill these fields</h1>

                <section className='ArticleFormDiv'>
                    

                    <form onSubmit={(z)=>handlePublish(z)}>

                        <input id='Input' onChange={(s)=>setArticleInfo({...ArticleInfo, title: s.target.value})} type="text" placeholder="Article title"></input>
                        <textarea id='TextArea' onChange={(s)=>setArticleInfo({...ArticleInfo, articleText: s.target.value})} placeholder='Type your article here'></textarea>
                        <button type='submit'>Publish</button>

                    </form>
                    
                </section>

                

            </div>
        
        </>
    )
}

export default NewArticle;