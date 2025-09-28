import React from "react";
import { FaTrash, FaBox, FaBoxOpen } from "react-icons/fa";

function DetailPageButton({ id, archived, onArchive, onDelete}) {
    return (
        <div className="detail-page__action">
            <button type="button" title={archived ? "Aktifkan" : "Arsipkan"} className="action" onClick={() => onArchive(id)}>
                {archived ?  <FaBoxOpen /> : <FaBox />}
            </button>
            <button type="button" title="Hapus" className="action" onClick={() => onDelete(id)}>
                <FaTrash />
            </button>
        </div>
    )
}

export default DetailPageButton;