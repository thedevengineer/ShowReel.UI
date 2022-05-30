import  ClipList from './components/ClipList/ClipList'
import React,  { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css'


function App() {
  const [totalTimeCode, setTimeCode] = useState([]);
  const [clips,setClips] = useState([]);
  const [isValid, setPageValidity] = useState([false]);
  const [hasError, setError] = useState([false]);

  useEffect(() => {
    axios.get("https://localhost:7279/api/Clip")
        .then(res => {

          var _res = Object.values(res.data);
          _res.forEach(e => {
              e.selected=false;
          });
            setClips(_res)
        }).catch(err => {
            console.log(err);
        })
  }, [])


  const showreelNameRef = useRef();

  function handleSubmit(e){
    const name = showreelNameRef.current.value;
    
    if(name === '') return
    else{
      let ids = GetSelectedClips();
      axios.post("https://localhost:7279/api/ReelClip", {ids, name})
      .then(res =>{
        console.log(res.data);
      }).catch(err =>{
        console.log(err.response.message);
      })
    }
    console.log(name);
    showreelNameRef.current.value=null;
    
  }

  function toggleClips(id){
    const newClipList = [...clips];

    const clip = newClipList.find(clip => clip.id === id);
    clip.selected = !clip.selected;
    setClips(newClipList);

    sendCalculate();
  }

  function sendCalculate(){
      let ids = GetSelectedClips();

      setTimeCode("");

      if(ids.length > 0){
        axios.post("https://localhost:7279/api/ReelClip/Calculate", ids)
        .then(res => {
          setTimeCode("Total TimeCode: " +  res.data);
          setPageValidity(true);
          setError(false);
        }).catch(err => {
          setTimeCode("Error: " + err.response.data);
          setPageValidity(false);
          setError(true);
        })
      }
  }

  function GetSelectedClips(){
    const newClipList = [...clips];
    const selectedClip = newClipList.filter(clip => clip.selected === true);
    var ids = [];
    selectedClip.forEach(clip =>
      {
        ids.push(clip.id);
      });

      return ids;
  }
 

  return (
    <>
    <div className='app-container'>

      <div className='header'>
        <div className='reel-name'>
         <label>Reel Name: </label>  
          <input type="text" ref={ showreelNameRef } disabled={!isValid}></input>
        </div>
         <div className='timecode'>
         <label className={hasError ? 'error' : 'no-error'}>{totalTimeCode}</label>
         </div>
      </div>
      <div>
        <ClipList toggleClips={toggleClips} clips={clips}/>
      </div>
      <br />
      <div>
        <button className='button' onClick={ handleSubmit } disabled={!isValid}>Create Reel</button>
      </div>
     
    </div>
    </>
  );
}

export default App;
