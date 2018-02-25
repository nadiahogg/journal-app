import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './listItem.js'
import moment from "moment";

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
    this.showEntry = this.showEntry.bind(this);
    this.state = {
      entries: [],
      index: -1,
      title: '',

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
      text: this.entryText.value,
      date: moment().format("x")
    };

    const dbref = firebase.database().ref();

    dbref.push(entry);

    this.entryTitle.value = "";
    this.entryText.value = "";
    this.entry.classList.toggle("show");
    this.showEntriesList(e);
  }

  showEntry(index) {
    console.log(index);
    console.log(this.state.entries[index].title);
    this.setState({ index, title: this.state.entries[index].title, text: this.state.entries[index].text});
    
    
    this.entry.classList.add("show");
    
  }

  removeEntry(entryId) {
    console.log(entryId);
    const dbRef = firebase.database().ref(entryId);
    dbRef.remove();
  }

  showEntriesList(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("show");
    this.nav.classList.toggle("active");
  }
  
  render() {
    let entryTitle;
    if (this.state.index > -1) {
      entryTitle = (
        "{this.state.entries[index].title}"
      )
    }
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
              value={this.state.title}
              placeholder="Title" required
            />
            <div className="date" ref={ref => (this.date = ref)}>
              <p>{moment().format("MMMM Do")}</p>
            </div>
            <label htmlFor="entry-text" />
            <textarea
              name="entry-text"
              ref={ref => (this.entryText = ref)}
              value={this.state.text}
              placeholder="Write your story"
            />
            <i className="far fa-lightbulb" />
            <i className="far fa-image" />
            <i className="fas fa-map-marker-alt" />
            <i className="far fa-trash-alt" />
            <input type="submit" value="DONE" />
          </form>
        </section>

        <section className="journal" ref={ref => {
            console.log(ref);
            (this.journal = ref);
            console.log(this.journal);
        }}>
          <div className="entry-preview">
            <h2>{this.state.entries.title}</h2>
            <h3>This is the Content</h3>
            <i className="far fa-edit"></i>
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
                    showEntry={this.showEntry}
                    index={i}
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
