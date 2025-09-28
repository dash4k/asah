import React from "react";
import { Link } from "react-router-dom";

function Heading() {
    return (
        <h1>
            <Link to="/">Aplikasi Catatan</Link>
        </h1>
    );
}

export default Heading;