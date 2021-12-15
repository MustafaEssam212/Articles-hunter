import {Intro} from './Components/Intro';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './Styles/Log-Reg.css'
import NewArticle from './Components/NewArticle';
import AllArticles from './Components/AllArticle';
import {UserContextProvider} from './Components/UserContext'
import {UserContext} from './Components/UserContext'
import {useContext, useEffect, useState} from 'react';
import MyArticles from './Components/MyArticles';
import Article from './Components/Article';


function App() {

  const UserInfo = useContext(UserContext);
  const [Logged, setLogged] = useState(false);
  const Token = localStorage.getItem('Token')
  


  useEffect(()=>{
    if(Token !== null){
      setLogged(true)
    }else{
      setLogged(false)
    }
 
  }, [])
  
  

  return (
    <div className="App">
      
      

      <BrowserRouter>

     
        <Header logged={Logged} username={UserInfo?.User?.username}/>
     
      

      

        <Routes>

            <Route path="/" element={<Intro />}></Route>
            <Route path="/NewArticle" element={<NewArticle author={`${UserInfo?.User?.email}`} username={`${UserInfo?.User?.username}`} />}></Route>
            <Route path="/ShowAllArticles" element={<AllArticles username={`${UserInfo?.User?.username}`} />}></Route>
            <Route path="/MyArticles" element={<MyArticles author={`${UserInfo?.User?.email}`} username={`${UserInfo?.User?.username}`} />}></Route>
            <Route path="/Article/:articletitle" element={<Article />}></Route>


        </Routes>

      </BrowserRouter>

            
    </div>
  );
}


function appWithStore(){
  return(
    <UserContextProvider>
        <App />
    </UserContextProvider>
  )
}

export default appWithStore;
