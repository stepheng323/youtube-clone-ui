import {useEffect, useRef, useState} from 'react'


function UseComponentVisible(initialIsVisible) {
  const [componentVisible, setComponentVisible] = useState(initialIsVisible);
  const ref = useRef();

  const handleClickOutside = (event) => {
    if(ref.current && !ref.current.contains(event.target)){
      setComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
  return{
    ref,
    componentVisible,
    setComponentVisible
  }
}

export default UseComponentVisible
