import { Link, defer } from "react-router-dom";
import styles from "./Card.module.css";

function Card({character}) {

    const { name, image} = character;
    return(
        <div className={`${styles.wrapper}`}>
            <div className={styles.border}>
            </div>
                <div className={`${styles.card} card`}>
                    <h2>{name}</h2>
                    <img src={image} alt="" width="200px" height="200px"/>
                </div>
        </div>
    )
}

export default Card