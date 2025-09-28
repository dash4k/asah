import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomePageButton() {
    const navigate = useNavigate();
    return (
        <div className="homepage__action">
            <button type="button" title="Tambah" className="action" onClick={() => navigate("/create")}>
                <FaPlus />
            </button>
        </div>
    )
}

export default HomePageButton;