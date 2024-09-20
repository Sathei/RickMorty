import { Link } from "react-router-dom";
import Card from "../card/Card";
import styles from "./Cards.module.css"

function Cards({ allCharacters }) {
    const characterList = allCharacters;
    return (
        <div className={styles.cards}>
            {characterList?.map((character) => (
                <Link to={`/detail/${character.id}`} key={character.id}>
                    <Card character={character} />
                </Link>
            ))}
        </div>
    );
}

export default Cards;