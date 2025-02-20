/* eslint-disable react/prop-types */
import './Card.css'

function Card({ character }) {
    const { name, image } = character;
    return (
        <div className="border-2 text-white p-1 m-2 divCard bg-black">
            <img src={image} alt={name} className="cardimg" />
            <div className="cardName">{name}</div>
        </div>
    );
}

export default Card;