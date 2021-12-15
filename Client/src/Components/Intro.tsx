import { Link } from 'react-router-dom';
import '../Styles/Intro.css'
import { useEffect } from 'react';


export const Intro = () =>{

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])

    return(
        <div className='IntroContainer'>

         

            <section className='FirstSection'>
            
                    <div className='IntroFrontLinear'></div>
                    <div className='Bubble'></div>
                    <div className='Bubble2'></div>
                    <div className='Bubble3'></div>
                    <div className='Bubble4'></div>
                    <div className='Bubble5'></div>
                    <div className="custom-shape-divider-bottom-1639301821">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                        </svg>
                    </div>

                    <div className='SectionInfo'>

                        <h1>Learn more about how you can publish with us</h1>
                        <p>Share your previous works, Projects, The experience you gained, Tell us about your life events to get a lot of opinions to make your life better.</p>
                        <Link to="/ShowAllArticles">Show Articles</Link>
                    </div>
            </section>
            
            
            <section className='SectionTwo'>
                <div className='Card'>
                    <i className="far fa-smile"></i>
                    <h3>Easy to use</h3>
                    <p>Articles hunter  is a very simple web application to use which makes you share your experience in a simple way</p>
                    <div id="CardBarId" className='CardBar'></div>
                </div>
                <div className='Card'>
                    <i className="fas fa-headset"></i>
                    <h3>24/7 Support</h3>
                    <p>Articles hunter hunter includes a customer service support 24/7 during the day.</p>
                    <div id="CardBarId" className='CardBar'></div>
                </div>
                <div className='Card'>
                    <i className="fas fa-palette"></i>
                    <h3>Easy to customize</h3>
                    <p>Articles hunter gives you the simple way to edit & customize your articles.</p>
                    <div id="CardBarId" className='CardBar'></div>
                </div>
                <div className='Card'>
                     <i className="fab fa-sketch"></i>
                    <h3>Awesome design</h3>
                    <p>Articles hunter built with a modern interface to attract users.</p>
                    <div id="CardBarId" className='CardBar'></div>
                </div>
            </section>



            <section className='SectionThree'>

                <div className='Quotation'>
                    <div className='InnerQuote'>
                        <i className="fas fa-quote-left"></i>
                        
                        <p>If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.</p>
                        <div id='triangle-up'></div>
                    </div>

                    <p className='Author'>-Oprah Winfrey-</p>
                    
                </div>

                <div className='Quotation'>
                    <div className='InnerQuote'>
                        <i className="fas fa-quote-left"></i>
                        
                        <p>The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.</p>
                        <div id='triangle-up'></div>
                    </div>

                    <p className='Author'>-Helen Keller-</p>
                    
                </div>

                <div className='Quotation'>
                    <div className='InnerQuote'>
                        <i className="fas fa-quote-left"></i>
                        
                        <p>Do not go where the path may lead, go instead where there is no path and leave a trail.</p>
                        <div id='triangle-up'></div>
                    </div>

                    <p className='Author'>-Ralph Waldo Emerson-</p>
                    
                </div>

                <div className='Quotation'>
                    <div className='InnerQuote'>
                        <i className="fas fa-quote-left"></i>
                        
                        <p>Spread love everywhere you go. Let no one ever come to you without leaving happier</p>
                        <div id='triangle-up'></div>
                    </div>

                    <p className='Author'>-Mother Teresa-</p>
                    
                </div>

            </section>


        </div>
    )
}




 