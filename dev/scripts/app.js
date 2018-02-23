import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  newJournalEntry(e) {
    e.preventDefault();
    console.log("hey");
  }


    render() {
      return <div>
          <header className="mainHeader">
            <h1>Journal App</h1>
            <nav>
              <a href="" onClick={e => this.newJournalEntry(e)}>Add a New Story</a>
            </nav>
          </header>
          <section className="entry">
            <form action="">
              <label htmlFor="entry-title" />
              <input type="text" name="entry-title" placeholder="Title" />
              <label htmlFor="entry-text" />
              <textarea name="entry-text" placeholder="Write your story" />
              <i className="far fa-lightbulb"></i>
              <i className="far fa-image"></i>
              <i className="fas fa-map-marker-alt"></i>
              <i className="far fa-trash-alt"></i>
              <input type="submit" value="DONE"/>
            </form>
          </section>
          <aside className="sidebar">
            <div className="search">
              <label htmlFor="search" />
              <input type="text" name="search" placeholder="search" />
            </div>
            <div className="list-item">
              <h2>Test Entry</h2>
              <h3>Test Date & Time</h3>
            </div>
            
          </aside>
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
