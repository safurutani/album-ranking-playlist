import Link from 'next/link';

export default function Home() {
  return (
    <div className='home flex h-screen font-fredoka max-sm:min-w-96'>
      <div className='home-column w-1/2 h-full content-center bg-title'>
        <h1 className='text-6xl sm:text-right text-center pr-8 max-w-1/2'>Ranked<br/>Album Playlist<br/>Generator</h1>
      </div>
      <div className='w-1/2 bg-home h-full content-center pl-8 align-middle max-sm:w-full max-sm:py-8'>
        <div className='feature-container'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='transparent'className='w-[40px] h-[40px]'>
              <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p className='text-black text-2xl ml-4'>Search for an album</p>
        </div>
        <div className='feature-container'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17 17' fill='#000000'className='w-[40px] h-[40px] flex-shrink-0'>
              <path d="M0 5H3L3 16H5L5 5L8 5V4L4 0L0 4V5Z"/>
              <path d="M8 11L11 11L11 0H13L13 11H16V12L12 16L8 12V11Z"/>
            </svg>
            <p className='text-black text-2xl ml-4'>Rearrange the tracks in your favorite order</p>
        </div>
        <div className='feature-container'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000000'className='w-[40px] h-[40px]'>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#0F0F0F"/>
          </svg>
          <p className='text-black text-2xl ml-4'>Save the order</p>
        </div>
        <div className='feature-container'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000000'className='w-[40px] h-[40px]'>
            <path d="M16 5V18M16 18C16 19.1046 14.6569 20 13 20C11.3431 20 10 19.1046 10 18C10 16.8954 11.3431 16 13 16C14.6569 16 16 16.8954 16 18ZM4 5H12M4 9H12M4 13H8M16 4L20 3V7L16 8V4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p className='text-black text-2xl ml-4'>Create your playlist!</p>
        </div>
          <br/>
          <p className='text-black text-2xl ml-8'>To get started, </p>
          <div className='rounded-full bg-secondary w-fit ml-8 mt-4 hover:bg-tertiary'>
            <Link href="/api/login">
              <p className='p-4 text-xl text-white'>Login to Spotify</p>
            </Link>
          </div>
        </div>
      </div>
  );
}
