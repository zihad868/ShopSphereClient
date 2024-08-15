import { Link } from 'react-router-dom';
import pageNot from '../assets/NotFound/pageNotFound.jpg';


const ErrorElement = () => {
    return (
        <div className='flex justify-center flex-col items-center mt-10'>
            <img className='w-[70%]' src={pageNot} alt="" />
            <Link className='bg-sky-300 rounded-md p-3 mt-4' to='/'>Back to Home</Link>
        </div>
    );
};

export default ErrorElement;