import React from "react";
import { getNote, archiveNote, unarchiveNote, deleteNote } from "../utils/local-data";
import NoteDetails from "../components/NoteDetails";
import DetailPageButton from "../components/DetailPageButton";
import { useParams, useNavigate } from "react-router-dom";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  return <DetailPage {...note} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: { ...props }
    };

    this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
    this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
  }

  onArchiveEventHandler(id) {
    this.setState((prevState) => {
      const newArchivedState = !prevState.note.archived;

      if (newArchivedState) {
        archiveNote(id);
      } else {
        unarchiveNote(id);
      }

      return {
        note: {
          ...prevState.note,
          archived: newArchivedState
        }
      };
    });
  }

  onDeleteEventHandler(id) {
    deleteNote(id);
    this.props.navigate(this.state.note.archived ? "/archive" : "/");
  }

  render() {
    return (
      <section className="detail-page">
        <NoteDetails
          title={this.state.note.title}
          createdAt={this.state.note.createdAt}
          body={this.state.note.body}
          archived={this.state.note.archived}
        />
        <DetailPageButton
          id={this.state.note.id}
          archived={this.state.note.archived}
          onArchive={this.onArchiveEventHandler}
          onDelete={this.onDeleteEventHandler}
        />
      </section>
    );
  }
}

export default DetailPageWrapper;