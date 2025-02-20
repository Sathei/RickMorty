import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/action";
import './pagination.css';

export default function Pagination() {

    const dispatch = useDispatch()
    const currentPage = useSelector((state) => state.currentPage);
    const charPerPage = useSelector((state) => state.charPerPage);
    const results = useSelector((state) => state.results)
    const allCharacters = useSelector((state) => state.allCharacters);
    //const searchResults = useSelector((state) => state.searchResults || []);

    //const totalItems = searchResults.length > 0 ? searchResults.length : allCharacters.length;
    const totalPages = Math.ceil(
        (results.length > 0 ? results.length : allCharacters.length) / charPerPage
    );

    const handlePage = (page) => {
        dispatch(setPage(page));
    }



    return (
        <div className="mt-4 bg-gradient-to-r from-blue-700 to-purple-950">
                <button
                    className="px-4 py-2 mx-1 border rounded boton-pag"
                    onClick={() => handlePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`px-4 py-2 mx-1 border rounded boton-pag ${
                            currentPage === index + 1 ? "active" : ""
                        }`}
                        onClick={() => handlePage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="px-4 py-2 mx-1 border rounded boton-pag"
                    onClick={() => handlePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        
    )
}
