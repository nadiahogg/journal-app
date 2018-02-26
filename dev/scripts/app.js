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
    
    this.state = {
      entries: [],
      index: "",
      text: "",
      title: ""
      
    };
    this.showEntriesList = this.showEntriesList.bind(this);
    this.newJournalEntry = this.newJournalEntry.bind(this);
    this.showEntry = this.showEntry.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({
      title: "",
      text: "",
      index: "",
    })
    this.entry.classList.add("show");
    this.sidebar.classList.remove("show");
    this.nav.classList.remove("active");
    
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  saveEntry(e) {
    e.preventDefault();
    console.log("submitted");
    const entry = {
      title: this.state.title,
      text: this.state.text,
      date: moment().format("x")
    };
    console.log(this)


    const dbref = firebase.database().ref();

    dbref.push(entry);

    this.entry.classList.remove("show");
    this.showEntriesList(e);
  }

  showEntry(index) {
    // console.log(this.props.index);
    // console.log(this.state.entries[index].title);
    // console.log(this.state.entries[index].key);
    this.setState({ index: this.state.entries[index].key, title: this.state.entries[index].title, text: this.state.entries[index].text });
    
    
    this.entry.classList.add("show");
    this.sidebar.classList.remove("show");
    
  }

  removeEntry(entryKey) {
    entryKey = this.state.index
    // console.log(entryKey);
    const dbRef = firebase.database().ref(entryKey);
    
    dbRef.remove();
    
    
    this.entry.classList.remove("show");

  }

  showEntriesList(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("show");
    this.nav.classList.toggle("active");
  }
  
  render() {
    let entryTitle;
    if (this.state.index) {
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
          <h1>Journal <span>Daily</span></h1>
          <nav>
            <a href="" className="lrg-btn" onClick={this.newJournalEntry}>
              Add a New Story
            </a>
          </nav>
        </header>
        <section className="entry" ref={ref => (this.entry = ref)}>
          
          <form action="" onSubmit={e => this.saveEntry(e)}>
            <label htmlFor="title" />
            <input
              type="text"
              id="title"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
              placeholder="Title" required
            />
           
            <div className="date" ref={ref => (this.date = ref)}>
              <p onClick={this.showEntriesList}>{moment().format("MMMM Do")}</p>
            </div>
            <label htmlFor="text" />
            <textarea
              name="text"
              id="text"
              onChange={this.handleChange}
              value={this.state.text}
              placeholder="Write your story"
            />
            <div className="footer">
                <div className="options">
                  <div>
                      <i className="far fa-lightbulb" />
                  </div>
                  <div>
                      <i className="far fa-image" />
                  </div>
                  <div>
                      <i className="fas fa-map-marker-alt" />
                  </div>
                  <div onClick={() => this.removeEntry(this.entry.key)}>
                    <i className="far fa-trash-alt"></i>
                  </div>
                </div>
                <div className="save-cancel">
                    <button onClick={this.signIn}>CANCEL</button>
                    <input type="submit" value="DONE" />
                  
                </div>
            </div>
          </form>
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
