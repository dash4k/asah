import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('q');

  function changeSearchParams(keyword) {
    setSearchParams({ q: keyword });
  }
  
  return <ArchivePage keyword={keyword} keywordChange={changeSearchParams} />;
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.keyword || '',
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
        return note.title.toLowerCase().includes(
            this.state.keyword.toLowerCase()
        );
    });
    return (
      <div className='archive-page'>
        <h2>Catatan Arsip</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
      </div>
    )
  }
}

export default ArchivePageWrapper;
