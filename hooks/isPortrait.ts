import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export function isPortrait(){
  const [orientation, setOrientation] = useState(true);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      if (width<height) {
        setOrientation(true)
      } else {
        setOrientation(false)
      }
    })

  }, []);

  return orientation;
}