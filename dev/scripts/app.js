import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './listItem.js'
import Moment from "moment";

const config = {
    apiKey: "AIzaSyA4JN1C6uThQMRWpAh9yyjKr4rud4xBEcI",
    authDomain: "journal-app-f5c63.firebaseapp.com",
    databaseURL: "https://journal-app-f5c63.firebaseio.com",
    projectId: "journal-app-f5c63",
    storageBucket: "",
    messagingSenderId: "309284746794"
};
firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.showEntriesList = this.showEntriesList.bind(this);
    this.newJournalEntry = this.newJournalEntry.bind(this);
    this.state = {
      entries: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .on("value", res => {
        const entryData = res.val();
        const dataArray = [];
        for (let objKey in entryData) {
          entryData[objKey].key = objKey;
          dataArray.push(entryData[objKey]);
        }
        this.setState({
          entries: dataArray
        });
      });
  }

  newJournalEntry(e) {
    e.preventDefault();
    this.entry.classList.toggle("show");
    this.sidebar.classList.remove("show");
    this.nav.classList.remove("active");
  }

  saveEntry(e) {
    e.preventDefault();
    console.log("submitted");
    const entry = {
      title: this.entryTitle.value,
      text: this.entryText.value
    };

    const dbref = firebase.database().ref();

    dbref.push(entry);

    this.entryTitle.value = "";
    this.entryText.value = "";
    // this.newJournalEntry(e);
    this.entry.classList.toggle("show");
    this.showEntriesList(e);
  }

  showEntry(entryId) {
    console.log(entryId);
    const dbRef = firebase.database().ref(entryId);
    dbRef.remove();
  }

  removeEntry(entryId) {
    console.log(entryId);
    const dbRef = firebase.database().ref(entryId);
    dbRef.remove();
  }

  showEntriesList(e) {
    e.preventDefault();
    console.log("sidebar");
    this.sidebar.classList.toggle("show");
    this.nav.classList.toggle("active");
  }

  render() {
    return (
      <div>
        <header className="mainHeader">
          <nav>
            <a
              href=""
              className="nav"
              ref={ref => (this.nav = ref)}
              onClick={this.showEntriesList}
            >
              Stories
            </a>
            <a href="" className="nav">
              Calendar
            </a>
            <a href="" className="nav">
              Map
            </a>
          </nav>
          <h1>Journal App</h1>
          <nav>
            <a href="" className="lrg-btn" onClick={this.newJournalEntry}>
              Add a New Story
            </a>
          </nav>
        </header>
        <section className="entry" ref={ref => (this.entry = ref)}>
          <form action="" onSubmit={e => this.saveEntry(e)}>
            <label htmlFor="entry-title" />
            <input
              type="text"
              name="entry-title"
              ref={ref => (this.entryTitle = ref)}
              placeholder="Title"
            />
            <div className="date" ref={ref => (this.date = ref)}>
              <p>this is the date placeholder</p>
            </div>
            <label htmlFor="entry-text" />
            <textarea
              name="entry-text"
              ref={ref => (this.entryText = ref)}
              placeholder="Write your story"
            />
            <i className="far fa-lightbulb" />
            <i className="far fa-image" />
            <i className="fas fa-map-marker-alt" />
            <i className="far fa-trash-alt" />
            <input type="submit" value="DONE" />
          </form>

          <div className="readEntry">
            <ReadEntry />
          </div>
        </section>

        <aside className="sidebar" ref={ref => (this.sidebar = ref)}>
          <div className="close" onClick={this.showEntriesList}>
            <i className="far fa-times-circle" />
          </div>
          <div className="search">
            <label htmlFor="search" />
            <input type="text" name="search" placeholder="search" />
          </div>
          <div className="entries-list">
            {this.state.entries
              .map((entry, i) => {
                return (
                  <ListItem
                    entry={entry}
                    key={`entry-${i}`}
                    removeEntry={this.removeEntry}
                  />
                );
              })
              .reverse()}
          </div>
        </aside>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
