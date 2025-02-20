/* eslint-disable react/prop-types */

import "./Card.css"

function Card({character}) {

    const { name, image} = character;
    return(
        <div className="border-2 text-white p-1 m-2 divCard bg-black">
                <div className="content-center items-center justify-items-center mb-2 ">
                    <h2>{name}</h2>
                    <img src={image} alt={name} className="cardimg"/>
                </div>
        </div>
    )
}

export default Card