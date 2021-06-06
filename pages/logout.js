import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('admin');
    router.push('/');
  }, []);

  return (
    <h1>U wordt direct doorgestuurd naar de Homepagina</h1>
  );
};

export default Logout;