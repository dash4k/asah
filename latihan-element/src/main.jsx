import React from "react";
import { createRoot } from "react-dom/client";
import DicodingLogo from './assets/dicoding-logo.png';

// const heading = React.createElement('h1', null, 'Biodata Perusahaan');

// const listItem1 = React.createElement('li', null, 'Nama: Dicoding Indonesia');
// const listItem2 = React.createElement('li', null, 'Bidang: Education');
// const listItem3 = React.createElement('li', null, 'Tagline: Decode Ideas, Discover Potential.');

// const unorderedList = React.createElement('ul', null, [listItem1, listItem2, listItem3]);

// const container = React.createElement('div', null, [heading, unorderedList]);

// const root = createRoot(document.getElementById("root"));
// root.render(container);

// const element = (
//     <div>
//         <h1>Biodata Perusahaan</h1>
//         <ul>
//             <li>Nama: Dicoding Indonesia</li>
//             <li>Bidang: Education</li>
//             <li>Tagline: Decode Ideas, Discover Potential.</li>
//             <img src={DicodingLogo} alt="Dicoding Logo" />
//         </ul>
//     </div>
// );

function SayHello() {
    return <p>Hello, World!</p>;
}

const element = (
    <div>
        <SayHello />
        <SayHello />
        <SayHello />
        <SayHello />
    </div>
)

const root = createRoot(document.getElementById('root'));
root.render(element);