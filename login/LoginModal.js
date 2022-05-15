import React from 'react'
import { useState } from 'react';
import styles from './MainLoginPage.module.scss';
import { useWindowSize } from '../hooks/ViewPortManager';
import Icons from '../components/Icons';
import hhCountryObj from "../global_countries"
import axios from 'axios';

function LoginModal({closelogin}) {

    // const { isMobile, isTablet, isDesktop } = useWindowSize();
//   const { setUserData, setLoginStatus } = useContext(AppStateContext);
//   const [loading, setLoading] = useState(false);
  const [errMessage, seterrMessage] = useState("");
  const [ErrorMessageState, setErrorMessageState] = useState(false);
  const [optionsState, setOptionsState] = useState("+91");
  const [checkbox, setCheckbox] = useState(false);
  // const [hidepasslogo, sethidepasslogo] = useState(false);
  const handleChange = (e) => {
    setOptionsState(e.target.value);
  };
  const [passwordErr, setPasswordErr] = useState(false);
  const [emailMobileErr, setEmailMobileErr] = useState(false);
  const [showEMErr, setshowEMErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [textisNumber, setTextisNumber] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [enteredtext, setEnteredText] = useState("");
  const [password, setPassword] = useState("");
  const [step, setstep] = useState("false")
  const [buttoncolor,setbuttoncolor] = useState(false)
  const [steponeerror , setsteponeerror ] = useState(false);
  const [steponemobileerror , setsteponemobileerror ] = useState(false);
  const [steponeemailerror , setsteponeemailerror ] = useState(false);
  const [steponetermserror , setsteponetermserror ] = useState(false);
  const [forgotPassw, setForgotPassw] = useState(false);
  const [closeloginmodal, setcloseloginmodal] = useState(false);

  // if(forgotPassw==true){
  //   <ForgotPass />
  // }

  const  checkboxclicked = (e) => {
    setCheckbox(!checkbox);
    if(enteredtext === ""){
      setbuttoncolor(false);
    }
    else if(checkbox == true ) {
      setbuttoncolor(false);
    }
    else {
      setbuttoncolor(true);
    }
   
  }
  const contiuesignin = () => {
    if(buttoncolor){
    if(enteredtext === "" && step === "false"){
      setsteponeerror(true);
      return false;
    }
    else{
    if (textisNumber) {
      if (mobile != "" && !isNaN(mobile) && mobile.length == 10) {
        if (checkbox == true) {
          setstep(true)
        }
        else{
          setsteponetermserror(true);
          return false;
        }
      }
      else{
        setsteponemobileerror(true);
        return false;
      }
    }
    else {
      if (email != "" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        if (checkbox == true) {
          setstep(true)
        }
        else{
          setsteponetermserror(true);
          return false;
        }
      }
      else{
        setsteponeemailerror(true);
        return false;
      }
    }
  }
}
  }

  const checkText = (e) => {
    if( e.target.value !== "" && checkbox == true){
      setbuttoncolor(true)
    }
    if(e.target.value === "" && checkbox == true){
      setbuttoncolor(false)
    }
    setEnteredText(e.target.value);
    if (isNaN(parseInt(e.target.value))) {
      setEmailMobileErr(false);
      setTextisNumber(false);
      setEmail(e.target.value);
      setMobile("");
    } else {
      setEmailMobileErr(false);
      setTextisNumber(true);
      setMobile(e.target.value);
      setEmail("");
    }
  }
  const passwordUpdate = (e) => {
    setPasswordErr(false);
    setPassword(e.target.value);
  };
  // log-in call
  const getEnquiry = (e) => {
    e.preventDefault();
    setEmailMobileErr(false);
    setPasswordErr(false);
    setErrorMessageState(false);
    setshowEMErr(false);
    if(step == true){
      if (enteredtext === "" && password === "") {
        setEmailMobileErr(true);
        setPasswordErr(true);
        setshowEMErr(true);
        return false;
      }
      if (enteredtext === "") {
        setEmailMobileErr(true);
        setshowEMErr(true);
        return false;
      }
      if (textisNumber) {
        if (mobile === "") {
          setEmailMobileErr(true);
          setshowEMErr(true);
          return false
        }
        if (mobile && isNaN(mobile)) {
          setEmailMobileErr(true);
          setshowEMErr(true);
          return false
        }
      }
      else {
        if (email && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
          setEmailMobileErr(true);
          setshowEMErr(true);
          return false;
        }
      }
      if (password === "") {
        setPasswordErr(true);
        setshowEMErr(true);
        return false;
      }
    }

    const logobj = {
        email : email,
        password : password
    }

    // setLoading(true);
    let url = "";
    url = "https://marketplaceb.herokuapp.com/api/login";
    axios.post(url, logobj)
      .then(response => {
          if(response){
              console.log(response)
            localStorage.setItem("token", response.data.token);
              closelogin(false);
          }
        // setLoading(false);
        if (response.data && response.data.status) {
          setUserData(response.data.user);
          setLoginStatus(response.data.status);
         secondParentCallback(response.data)
         setcloseloginmodal(true);
         
        }
        else {
          if(step == true){
          setErrorMessageState(true);}
          seterrMessage(response.data.errorMessage);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }


  return (
    <div className={styles.login_container}>
    <div className={`sign-up-box login-slide ${styles.login_left_box}`}>
      <h3 align='center'>Sign In</h3>
      <div className="login-form login-dash">
        <form name="loginForm" autoComplete="off" onSubmit={getEnquiry}  noValidate>
          {/* {showEMErr &&
            <div className="growl-container top-center">
              <div className="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable">
                <button type="button" className="close close-error" onClick={() => setshowEMErr(false)}>×</button>
                <div className="growl-message ng-binding">Invalid email or password</div>
              </div>
            </div>
          }
          {steponeerror &&
            <div className="growl-container top-center">
              <div className="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable">
                <button type="button" className="close close-error" onClick={() => setsteponeerror(false)}>×</button>
                <div className="growl-message ng-binding">Enter Email or Mobile</div>
              </div>
            </div>
          }
           {steponemobileerror &&
            <div className="growl-container top-center">
              <div className="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable">
                <button type="button" className="close close-error" onClick={() => setsteponemobileerror(false)}>×</button>
                <div className="growl-message ng-binding">Enter Valid Mobile Number</div>
              </div>
            </div>
          }
           {steponeemailerror &&
            <div className="growl-container top-center">
              <div className="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable">
                <button type="button" className="close close-error" onClick={() => setsteponeemailerror(false)}>×</button>
                <div className="growl-message ng-binding">Enter Valid Email</div>
              </div>
            </div>
          }
          {steponetermserror &&
            <div className="growl-container top-center">
              <div className="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable">
                <button type="button" className="close close-error" onClick={() => setsteponetermserror(false)}>×</button>
                <div className="growl-message ng-binding">Please Agree Terms and conditions</div>
              </div>
            </div>
          } */}
          {/* {ErrorMessageState &&
            <div className="growl-container top-center">
              <div className="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable">
                <button type="button" className="close close-error" onClick={() => setErrorMessageState(false)}>×</button>
                <div className="growl-message ng-binding">{errMessage}</div>
              </div>
            </div>
          } */}
          
          <div className="floating-input-form stacked form-group ">
            <div className={styles.loginModal__inputfeildtext}>
            
              
            
              <div className={styles.Newregister__space}>
                <div className={styles.loginModal__inputtext}>
              <label className={emailMobileErr ? "floating-label floating-label-empty" : "floating-label"} htmlFor={textisNumber ? "signupPhone" : "login-email"}>Email or Mobile</label>
              </div>
                <div className={styles.Newregister__nameinput__all}>
              
                  {textisNumber && <>
                    <label className={styles.Signin__countrycode} htmlFor="login-country-list">{optionsState}</label>
                    <select id="login-country-list" className={styles.Signin__option} value={optionsState} onChange={handleChange} autoComplete="off">
                      {hhCountryObj.countries.map((option, index) => (
                        <option key={"country" + index} value={option.code}>{option.code} {option.name}</option>
                      ))}
                    </select>

                  </>}

                  <input type="text" id={textisNumber ? "signupPhone" : "login-email"} className={styles.Newregister__nameinput} value={enteredtext} onChange={checkText} required />
                
                </div>
              </div>
            </div>
              <div className={styles.Newregister__space}>
                 <div className={styles.loginModal__inputfeildtext}>
                 <div className={styles.loginModal__inputtext}>
                <label className={emailMobileErr ? "floating-label floating-label-empty" : "floating-label"} htmlFor="signupPassword">Password</label>
                </div>
               
                <div className={`${styles.alignEye} ${styles.Newregister__nameinput}`}>
                  <input type={showPassword ? "text" : "password"} id="signupPassword" className={styles.Newregister__nameinput__password} value={password} onChange={passwordUpdate} required />
                  {password &&
                    <div onClick={() => setShowPassword(!showPassword)} >
                      <Icons className={styles.Signin__hidepasslogo} name={showPassword ? "showpass" : "hidepass"} />
                    </div>
                  }
                   </div>
                   {/* <div onClick={() => setForgotPassw(true)}>Forgot Password?</div> */}
                   {/* <div><ForgotPass />Forgot Password?</div> */}
                </div>
              </div>
            
          </div>
    
           <button className={styles.Signin__next1} onClick={contiuesignin}>Continue</button> 
            
          

          <div className={`text-center ${styles.Signin__forgotpass}`}> 
            <span>Forgot password?</span>
          </div>
        
          {/* <p className={`text-center ${styles.register_with}`}>or sign in with</p>  */}
        </form>
      </div>
      {/* {loading && <div className="loader"><Loaders/></div>} */}
    </div>
    </div>
  )
}

export default LoginModal