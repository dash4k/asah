import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import HomePageButton from '../components/HomePageButton';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('q');

  function changeSearchParams(keyword) {
    setSearchParams({ q: keyword });
  }
  
  return <HomePage keyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
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
      <div className='homepage'>
        <h2>Catatan Aktif</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
        <HomePageButton />
      </div>
    )
  }
}

export default HomePageWrapper;
