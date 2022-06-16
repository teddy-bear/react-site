import React from "react";
import {Link} from "react-router-dom";

const Page404 = (props) => (
    <div className='text-center'>
        <h1>Page not found</h1>
        <Link to='/' className='btn btn-dark'>
            Return to the home page
        </Link>
    </div>
);

export default Page404;
