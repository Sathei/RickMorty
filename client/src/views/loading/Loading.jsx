import './loading.css';

// eslint-disable-next-line react/prop-types
function Loading({ duration }) {
    return (
        <div className=" image-fond m-0 p-0 w-full min-h-screen  flex flex-col items-center justify-center bg-slate-900">
            <div className="loading-bar-container">
                <div className="loading-bar" style={{animationDuration: `${duration}ms`}}></div>
            </div>
        </div>
    );
}

export default Loading;