import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const getHeight = () =>
  window.innerHeight || document.documentElement.clientHeight;
const getWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const useWindowSize = () => {
  const [width, setWidth] = useState(getWidth());
  const [height, setHeight] = useState(getHeight());

  useEffect(() => {
    const handleResize = debounce(() => {
      setHeight(getHeight());
      setWidth(getWidth());
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [width, height];
};

export default useWindowSize;
