import React,{useState} from 'react'
import axios from 'axios'
import Gallery from './Gallery';

const apiKey= '42db268465139ed2dac8d89cac7c999b';

const App = () => {
  const [search,setSearch]=useState('');
  const [data,setData]=useState([]);
  const changeHandler=e=>{
    setSearch(e.target.value)
  }
  const submitHandler=e=>{
    e.preventDefault();
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(
      response=>{setData(response.data.photos.photo)
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
    })
      
  }
  
  return (
    <div>
      <center>
        <h2>Gallery snapshot</h2>
        <form onSubmit={submitHandler}>
          <input size='30' type='text' vlaue={search} onChange={changeHandler}/><br/><br/>
          <input type='submit' name='search'/>
        </form>
        <br/>
        {data.length >= 1 ? <Gallery data={data}/> : <h2>No Data Loaded</h2>}
      </center>
    </div>
  )
}

export default App
