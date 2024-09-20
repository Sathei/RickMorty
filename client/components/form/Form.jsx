import Cloudinary from "../cloudinary/Cloudinary";
function Form() {
    const pru = () => {
         return console.log('hola');  
    }
    pru()
    
    return(
        <div>
            <form action="">
            <label htmlFor="name">Name:</label>
            <input type="text" name="" id="name" />
            <br /><br />
            <label htmlFor="specie">Specie</label>
            <input type="text" name="" id="specie" />
            <br /><br />
            <label htmlFor="gender">Gender</label>
            <input type="text" name="" id="gender" />
            <br /><br />
            <label htmlFor="origin">Origin</label>
            <input type="text" name="" id="origin" />
            <br /><br />
            <label htmlFor="status">Status</label>
            <input type="text" name="" id="status" />
            <br /><br />
            <label htmlFor="type">Type</label>
            <input type="text" name="" id="type" />
            <br /><br />
            <label htmlFor="location">Location</label>
            <input type="text" name="" id="location" />
            <br /><br />

            <Cloudinary/>
            </form>
        </div>
    )
}

export default Form;