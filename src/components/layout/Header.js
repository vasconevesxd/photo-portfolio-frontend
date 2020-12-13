import {Link} from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
    return (
        <div>
            <Link to="/">Home</Link>
            <AuthOptions />
        </div>
    )
}
