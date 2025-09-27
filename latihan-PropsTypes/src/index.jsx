import React from "react";
import PropTypes from 'prop-types';

function SayHello({ name }){
    return <p>Hello, {name}</p>;
}

SayHello.prototype = {
    name: PropTypes.string.isRequired
};

<SayHello />;
<SayHello name={[]} />;