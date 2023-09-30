import { Link } from "react-router-dom";


export default function NotFound(){

    return (
        <div>
            404 - Page Not Found
            <br />
            <Link to="/">
                Go back
            </Link>
        </div>
    )
}