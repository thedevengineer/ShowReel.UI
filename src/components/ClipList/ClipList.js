import React from 'react';
import Clip from '../clip/Clip';

export default function ClipList({ clips, toggleClips }) {
  return (
   clips.map(clip => {
       return <Clip key={clip.id} toggleClips={toggleClips} clip={clip} />
   })
  );
}
