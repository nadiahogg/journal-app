import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
      return <div>
          <header className="mainHeader">
            <h1>Journal App</h1>
            <nav>
              <a href="">Add a New Story</a>
            </nav>
          </header>
          <section className="entries">
            <form action="">
              <label htmlFor="entry-title" />
              <input type="text" name="entry-title" placeholder="Title" />
              <label htmlFor="entry-text" />
              <textarea name="entry-text" placeholder="Write your story" />
            </form>
          </section>
          <aside className="sidebar" />
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
