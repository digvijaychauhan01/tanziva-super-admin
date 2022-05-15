import { useState } from "react"
import { MainLoginPage } from "../login/MainLoginPage"
import styles from "./HomeComponent.module.scss"

export const HomeComponent = () => {
  const[showlogin, setshowlogin] = useState(true);

  return (
    <div>
      <div className={styles.homepage}>
        <h1>Welcome To Tanziva</h1>
      </div>
        <MainLoginPage setshowlogin={setshowlogin}/>
    </div>
  )
}
