/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Card from "../card/Card";
import "./Cards.css"

function Cards({ allCharacters }) {
    const characterList = allCharacters;
    return (
        <div className="cards p-2">
            {characterList?.map((character) => (
                <Link to={`/detail/${character.id}`} key={character.id}>
                        <Card character={character} />
                </Link>
            ))}
        </div>
    );
}

export default Cards;