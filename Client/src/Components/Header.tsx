import '../Styles/Header.css'
import {Link} from 'react-router-dom'
import { useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Notification from './Notification';
import { UserContext } from './UserContext';


type HeaderProps = {
  username?: string,
  logged: boolean
}


const Header = (props: HeaderProps) => {

    

    
    
    const [Toggle, setToggle] = useState(false);
    const [LoggedToggle, setLoggedToggle] = useState(false);
    const [OpenRegister, setOpenRegister] = useState(false);
    const [OpenLogin, setOpenLogin] = useState(false);
    const [Show, setShow] = useState(false);  
    const [Errors, setErrors] = useState< Array<{ msg: string, value?: string, param?: string, location?: string}> >([]);
    const [Success, setSuccess] = useState< Array<{ msg: string}> >([]);
    const UserInfo = useContext(UserContext);


    useEffect( ()=>{
      setErrors([])
      setSuccess([])
    }, [OpenRegister, OpenLogin])
    

    window.onload = () =>{
        const HeaderEle = document.getElementById('Header')!;
        window.onscroll = function() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                HeaderEle.style.backgroundImage = "linear-gradient(to right, #281483, #4a1c4b)";
                
            } else {
                HeaderEle.style.backgroundImage = "none";
                
            }
        };
    }



   


    // Register Pop Window

    type RegisterState = {
      username: string,
      email: string,
      password: string,
      confirmpassword: string
    }

    const Register = () =>{

        const [UserData, setUserData] = useState<RegisterState>({} as RegisterState)

      
        const handleRegister = (z: React.FormEvent<HTMLFormElement>)  => {

          z.preventDefault();
            
          

            axios.post(`${process.env.REACT_APP_API}v1/register`, {UserData})
            .then(res => {
              if(res.data.msg === 'Account registered successfully, you can login.'){
                setShow(true)
                setSuccess([{msg: res.data.msg}])
                setOpenRegister(false)
              }else if(res.data.msg === `This username ${UserData.username} already in use`){
                setShow(true)
                setErrors([...Errors, {msg: res.data.msg}])
              }else if(res.data.msg === `This Email ${UserData.email} already in use`){
                setShow(true)
                setErrors([...Errors, {msg: res.data.msg}])
              }else if(res.data.msg === `Password does not match`){
                setShow(true)
                setErrors([...Errors, {msg: res.data.msg}])
              }else{
                setShow(true)
                setErrors(res.data)
              }
            })

         

        }
        
        return(
          <div className='RegisterContainer'>


              
    
              <div className='InnerRegister'>
    
                <h1><span>Register</span> as a new member</h1>
    
                <form onSubmit={(z)=>handleRegister(z)}>
                  <input onChange={(s)=>setUserData({...UserData, username: s.target.value})} type="text" placeholder='Username'></input>
                  <input onChange={(s)=>setUserData({...UserData, email: s.target.value})} type="email" placeholder='Email'></input>
                  <input onChange={(s)=>setUserData({...UserData, password: s.target.value})} type="password" placeholder='Password'></input>
                  <input onChange={(s)=>setUserData({...UserData, confirmpassword: s.target.value})} type="password" placeholder='Confirm Password'></input>
                  <button type='submit'>Register</button>
                </form>
                  
                <i onClick={()=>setOpenRegister(false)} className="fas fa-times PopClose"></i>
    
              </div>
    
          </div>
        )
      }




      // Login Pop Window

      type LoginDataType = {
        email: string,
        password: string
      }

      const LogIn = () =>{

        const [LogInData, setLogInData] = useState<LoginDataType>({} as LoginDataType)
    
        const handleLogin = (s: React.FormEvent<HTMLFormElement>) => {
          s.preventDefault();
          setErrors([])
          axios.post(`${process.env.REACT_APP_API}v1/login`, {LogInData})
          .then(res => {
            if(res.data.message){
              setShow(true)
              setErrors([...Errors, {msg: res.data.message}])
            }else{
              localStorage.setItem('UserInformation', JSON.stringify(res.data.user))
              localStorage.setItem('Token', JSON.stringify(res.data.token))
              UserInfo?.setUser(res.data.user)
              window.location.reload();
            }
          })
        }
    
    
        return(
          <div className='RegisterContainer'>
    
              <div className='InnerRegister'>
    
                <h1><span>Log in</span> to your account</h1>
    
                <form onSubmit={(s)=>handleLogin(s)}>
                  
                  <input onChange={(s)=>setLogInData({...LogInData, email: s.target.value})} type="email" placeholder='Email'></input>
                  <input onChange={(s)=>setLogInData({...LogInData, password: s.target.value})} type="password" placeholder='Password'></input>
                  
                  <button type='submit'>Log in</button>
                </form>
                  
                <i onClick={()=>setOpenLogin(false)} className="fas fa-times PopClose"></i>
    
              </div>
    
          </div>
        )
      }
  
    

      const handleLogOut = () =>{
        localStorage.removeItem('Token')
        localStorage.removeItem('UserInformation')
        window.location.reload();
      }


    return(

        <>


        {
          props.logged ? <header className='LoggedInHeader' id='Header'>

                          <Link className='Logo' to="/">Articles</Link>
                          
                          <ul className={LoggedToggle ? "LoggedInMobile" : "LoggedInDesktop"}>
                              <li><Link className='NameHeader' to="/"><i className="fas fa-user-circle"></i> {UserInfo?.User?.username}</Link></li>
                              <li><Link to="/NewArticle"><i className="fas fa-edit"></i> New article</Link></li>
                              <li><Link to="/MyArticles"><i className="fas fa-newspaper"></i> My articles</Link></li>
                              <li><a onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                          </ul>

                          <div onClick={()=>setLoggedToggle(!LoggedToggle)} className='LoggedBars'>

                              <i className="fas fa-bars"></i>

                          </div>

                      </header> : <header className='LoggedOutHeader' id='Header'>

                                    <Link className='Logo' to="/">Articles</Link>

                                    <ul className={Toggle ? "LoggedOutMobile" : "LoggedOutDesktop"}>
                                        <li><Link className='NameHeader' to="/"><i className="fas fa-user-circle"></i> Guest</Link></li>
                                        <li><a onClick={()=>setOpenRegister(!OpenRegister)}><i className="fas fa-user-plus"></i> Register</a></li>
                                        <li><a onClick={()=>setOpenLogin(!OpenLogin)}><i className="fas fa-user"></i> Sign in</a></li>
                                    </ul>

                                    <div onClick={()=>setToggle(!Toggle)} className='Bars'>

                                        <i className={Toggle ? "fas fa-times" : "fas fa-bars"}></i>

                                    </div>



                                    <div className={OpenRegister ? "ReGister" : "NoSuccess"}>
                                      
                                      <Register />
                                      
                                      
                                    </div>

                                    <div className={OpenLogin ? "ReGister" : "NoSuccess"}>
                                      
                                      <LogIn />
                                      
                                    </div>


                                    <div className='PopNotification'>

                                      <Notification show={Show} errors={Errors} success={Success}/>

                                    </div>

                                    </header>
        }
            

                



               
             
            

        </>

    )
}



export default Header;