import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




function Page() {
  return (
   <div className="full-page">
     <PageHeader />
     <PageBody />
   </div>
  );
}


function PageHeader () {
  return (
    <div className="top-page">   
      <div className="left-side-logo">
        <button>
          <img src="https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=3" alt="logo"></img>
        </button>
      </div>
      <div className="right-side-searchbar">
        <button>
          <img src="https://freepikpsd.com/wp-content/uploads/2019/10/search-icon-png-white-1-Transparent-Images-Free.png" alt="search-icon"></img>
        </button>    
        <input placeholder="Search"></input>
      </div>
    </div>
  );
}

function PageBody () {
  return (
    <div className="middle-page">
      <ListContainer />
    </div>
  );
}










function MovieContainer (props) {
  let checkMarkButtonIcon =  <i className="far fa-check-circle fa-3x"></i>
  let pluskButtonIcon= <i className="far fa-check-circle fa-3x"></i> //// to add the plus icon instead, I will add later with if statement that check in the state of myList to see if the movie is in it which I need to import in this function I guess
  return (
    <div className="movie-container">
      <button className="poster-button" style={{backgroundImage: 'url(https://image.tmdb.org/t/p/w300/' + props.poster + ')'}}>
        <div>
          
          <p>{props.title}</p>
          <button className="add-movie-button"  onClick={props.clickAdd}  >
            {checkMarkButtonIcon}
          </button>

        </div>
      </button>
    </div>
  )
}










class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,

      myList: [],
      clickedState: false
    }
  }
  clickAdd (listEl) {
    let elIndex = this.state.myList.indexOf(listEl);

    if (elIndex == -1) {
      this.state.myList.push(listEl);

      this.setState({
        clickedState: true,
      })
    } else {
      this.state.myList.splice(elIndex, 1);

      this.setState({
        clickedState: false
      })
    }
  }
  componentDidMount() {
    fetch('https://movied.herokuapp.com/discover')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data,
          isLoaded: true, 
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  render () {  
    const {items, isLoaded, myList } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
          <div className="my-list-container">    
            <div className="list-title">
              <h2>My List</h2>
            </div>
            <div className="list-elements">
              <div>
                {
                  myList.map(item => (
                    <MovieContainer 
                      title={item.original_title} 
                      poster={item.backdrop_path}
                      clickAdd = {() => { this.clickAdd(item)      } }
                    />
                  ))
                }
              </div>
            </div>
          </div>

        <div className="my-list-container">
          <div className="list-title">
            <h2>Discover</h2>
          </div>
          <div className="list-elements">
            <div>
              {
                items.map(item => (
                  <MovieContainer    
                    title={item.original_title}
                    poster={item.backdrop_path}
                    clickAdd = {() => { this.clickAdd(item)     } }
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}












ReactDOM.render(<Page />, document.getElementById("root"));



// CRUD video   https://www.youtube.com/watch?v=-fCn_WqtuNU
///////  gitrepo   https://github.com/ArjunAranetaCodes/MoreCodes-Youtube/tree/master/koajs-react-mongodb-todolist