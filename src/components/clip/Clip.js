import React from 'react';
import './Clip.css';


export default function Clip({ clip, toggleClips }) {
  function handClipClick(){
      toggleClips(clip.id);
  }

  return (
    <div className="clip">
        <div>
            <label>
                <input type="checkbox" checked={clip.selected} onChange={handClipClick} />
                {clip.name} 
            </label>
        </div>
        <div className='clip-details'>
            <div>
                <label>
                    {clip.videoQuality.standard} - {clip.videoQuality.definition}
                </label>
            </div>
            <div>
                <label>
                    {clip.duration}
                </label>
            </div>
            <div>
                <label>
                    {clip.description}
                </label>
            </div>
        </div>
       
        
    </div>
  );
}
