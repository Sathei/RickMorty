import Cloudinary from "../cloudinary/Cloudinary";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function Form() {
    
    const [character, setCharacter] = useState({
        name: "",
        status: "",
        specie: "",
        type: "",
        gender: "",
        origin: "",
        location: "",
        image: "",
    });

    const [errors, setErrors] = useState({
        name: "Required",
        status: "Required",
        specie: "Required",
        type: "Required",
        gender: "Required",
        origin: "Required",
        location: "Required",
        image: "Required",
        });


    const validate = (state, name) => {
        switch(name){
            case "name": 
            if(state.name === ""){
                setErrors({...errors, name:"Required"})  
            } else {
                if(state.name.length < 5){
                    setErrors({...errors, name:"Must have more than 5 caracters"})
                } else {
                    setErrors({...errors, name:""})
                }
            }
            break;
            case "status": {
                if(state.status === ""){
                    setErrors({...errors, status:"Required"})  
                } else {
                    if(state.status !== "Alive" || state.status !== "Dead" || state.status !== "Unknown"){
                        setErrors({...errors, status:"Must be a valid status"})
                    } else {
                        setErrors({...errors, statu:""})
                    }
                }
            }
            break;
            case "specie" : {
                if(state.specie === ""){
                    setErrors({...errors, specie:"Required"})  
                } else {
                    if(state.specie.length < 2 ){
                        setErrors({...errors, specie:"Must be a valid specie"})
                    } else {
                        setErrors({...errors, specie:""})
                    
                    }
                }
            }
            break;
            case "type": {
                if(state.type === "") {
                    setErrors({...errors, type:"Required"})
                } else {
                    if(state.type.length < 2 ){
                        setErrors({...errors, type:"Must be a valid type"})
                    } else {
                        setErrors({...errors, type:""})
                    
                    }
                }
            }
            break;
            case "gender": {
                if(state.gender === "") {
                    setErrors({...errors, gender:"Required"})
                } else {
                    if(state.gerder.length < 2 ){
                        setErrors({...errors, gender:"Must be a valid gender"})
                    } else {
                        setErrors({...errors, gender:""})
                    }
                }
            }
            break;
            case "origin": {
                if(state.origin === "") {
                    setErrors({...errors, origin:"Required"})
                } else {
                    if(state.origin.length < 2 ){
                        setErrors({...errors, origin:"Must be a valid origin"})
                    } else {
                        setErrors({...errors, origin:""})
                    }
                }
            }
            break;
            case "location": {
                if(state.location === "") {
                    setErrors({...errors, location:"Required"})
                } else {
                    if(state.location.length < 2 ){
                        setErrors({...errors, location:"Must be a valid location"})
                    } else {
                        setErrors({...errors, location:""})
                    }
                }
            }
            break;
            case "image": {
                if(state.image === "") {
                    setErrors({...errors, image:"Required"})
                } else {   
                    if(state.image.length < 2 ){
                        setErrors({...errors, image:"Must be a valid url"})
                    } else {
                        setErrors({...errors, image:""})
                    }
                }
            }
            default:
                break;
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCharacter({
            ...character,
            [name]: value
        });
        validate({...character, [name]:value, name});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted character: ", character);
        
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                name="name"
                id="name"
                value={character.name} 
                onChange={handleChange}/>
            <br /><br />

            <p>{errors.name}</p>

            <label htmlFor="specie">Specie</label>
            <input
                type="text"
                name="specie"
                id="specie"
                value={character.specie}
                onChange={handleChange}/>
                
            <p>{errors.specie}</p>

            <br /><br />
            
            <label htmlFor="gender">Gender</label>
            <input
                type="text"
                name="gender"
                id="gender"
                value={character.gender}
                onChange={handleChange}/>
            
            <p>{errors.gender}</p>

            <br /><br />

            <label htmlFor="origin">Origin</label>
            <input
                type="text"
                name="origin"
                id="origin"
                value={character.origin}
                onChange={handleChange}/>

            <p>{errors.origin}</p>

            <br /><br />

            <label htmlFor="status">Status</label>
            <input
                type="text"
                name="status"
                id="status"
                value={character.status}
                onChange={handleChange}/>

            <p>{errors.status}</p>
            
            <br /><br />

            <label htmlFor="type">Type</label>
            <input
                type="text"
                name="type"
                id="type"
                value={character.type}
                onChange={handleChange}/>

            <p>{errors.type}</p>

            <br /><br />

            <label htmlFor="location">Location</label>
            <input
                type="text"
                name="location"
                id="location"
                value={character.location}
                onChange={handleChange}/>

            <p>{errors.location}</p>

            <br /><br />

            <Cloudinary/>
            <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Form;