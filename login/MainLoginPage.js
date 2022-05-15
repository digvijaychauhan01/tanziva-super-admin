import React from 'react';
import styles from './MainLoginPage.module.scss';
import Icons from '../components/Icons';
import LoginModal from './LoginModal';

export const MainLoginPage = ({setshowlogin}) => {
  return (
    <>
    <div className={styles.login}>
        <div className={styles.login__box}>
          <LoginModal closelogin={setshowlogin}/>
          <div className={styles.login__box_right}>
            <h1>WELCOME TO TANZIVA</h1>
          </div>
        </div>
    </div>
    </>
  )
}
