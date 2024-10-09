import Cloudinary from "../cloudinary/Cloudinary";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_char } from "../../redux/action";

function Form() {
    
    const dispatch = useDispatch()
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
        image: "",
        });

        useEffect(() => {
            console.log("Updated character image" , character.image);
            
        },[character.image])

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
                    if(!["Alive", "Dead", "Unknown"].includes(state.status)){
                        setErrors({...errors, status:"Must be a valid status"})
                    } else {
                        setErrors({...errors, status:""})
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
                    if(state.gender.length < 2 ){
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

   

    const disableFunction = () => {
        // Verificar si algún campo de character está vacío
        for (const key in character) {
            if (character[key] === "") {
                return true;
            }
        }
    
        // Verificar si existe algún error activo
        for (const error in errors) {
            if (errors[error] !== "") {
                return true; 
            }
        }
    
        return false; // Si no hay campos vacíos y no hay errores, activar el botón
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setCharacter({
            ...character,
            [name]: value
        });
        validate({...character, [name]:value}, name);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(create_char(character))
        console.log("Submitted character: ", character);
        
    }

    const preset_name = import.meta.env.VITE_PRESET_NAME                
    const cloud_name = import.meta.env.VITE_CLOUD_NAME
    
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', preset_name)

        setLoading(true)

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{

                method: 'POST',
                body: data
            }); 
            const file = await response.json();
            const imageUrl = file.secure_url
            setImage(imageUrl);
            setCharacter((prevCharacter) =>({
                ...prevCharacter,
                image: imageUrl
            }))
            
            validate({ ...character, image: imageUrl }, 'image');
            
            console.log("url de la imagen", imageUrl);
            
            setLoading(false);

        }
         catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false)
            
        }

       
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
            {errors.name && <p>{errors.name}</p>}

            <br /><br />

            <label htmlFor="specie">Specie</label>
            <input
                type="text"
                name="specie"
                id="specie"
                value={character.specie}
                onChange={handleChange}/>
                
            {errors.specie && <p>{errors.specie}</p>}

            <br /><br />
            
            <label htmlFor="gender">Gender</label>
            <input
                type="text"
                name="gender"
                id="gender"
                value={character.gender}
                onChange={handleChange}/>
            
            {errors.gender && <p>{errors.gender}</p>}

            <br /><br />

            <label htmlFor="origin">Origin</label>
            <input
                type="text"
                name="origin"
                id="origin"
                value={character.origin}
                onChange={handleChange}/>

            {errors.status && <p>{errors.origin}</p>}

            <br /><br />

            <label htmlFor="status">Status</label>
            <input
                type="text"
                name="status"
                id="status"
                value={character.status}
                onChange={handleChange}/>

            {errors.status && <p>{errors.status}</p>}
            
            <br /><br />

            <label htmlFor="type">Type</label>
            <input
                type="text"
                name="type"
                id="type"
                value={character.type}
                onChange={handleChange}/>

            {errors.type && <p>{errors.location}</p>}

            <br /><br />

            <label htmlFor="location">Location</label>
            <input
                type="text"
                name="location"
                id="location"
                value={character.location}
                onChange={handleChange}/>

           {errors.location && <p>{errors.location}</p>} 

            <br /><br />

            <div>
                <input type="file"
                name="file"
                placeholder="Upload an image"
                onChange={(e)=>uploadImage(e)}
                />

                {loading ?  (
                    <h3>Loading...</h3>
                ): (
                    image && <img src={image} alt="imagen"/>
                )}
                
            </div>
            <button disabled={disableFunction()} type="submit">Create</button>
            <button type="button" onClick={(e) => setImage("")}>Clear</button>/
            </form>
        </div>
    )
}

export default Form;