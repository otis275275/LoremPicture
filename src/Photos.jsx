import { useState, useEffect} from 'react'
import { Route, Routes, BrowserRouter, useNavigate, Outlet, Link } from 'react-router-dom'
export default function Photos() {

    const [photos, setPhotos] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isEnd, setIsEnd] = useState(false)

  //Fetch API to get images
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=15`)
        const data = await res.json()
        if (data.length === 0) {
          setIsEnd(true)
          setIsLoading(false)
          return
        }
        setPhotos(prev => [...prev, ...data])
      } catch (error) {
        console.error('Lỗi fetch ảnh:', error)
      }
      // Must have, nếu không thì sẽ chỉ load đc 1 lần
      finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page])

  useEffect(() => {
    function handleScroll() {
      const scrollPos = window.innerHeight + window.scrollY
      const pageHeight = document.body.offsetHeight

      if (isLoading || isEnd) {
        return
      }

      if (scrollPos >= pageHeight - 1) {
        setIsLoading(true)
        setPage(prev => prev + 1)
      } 
      
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, isEnd])


    return (
    <>
      <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-center hover:pointer-cursor'>
        {photos.map((image, index) => {
          return (
            <div key={index} className='flex flex-col items-center my-4'>
                <Link to= {`/photos/${image.id}`}>
                    <img src={image.download_url} className='w-60 h-60'></img>
                </Link>
              <h3 className='text-center'>{image.author}</h3>
            </div>
          )
        })}
      </div>
      <h1>{isLoading && 'Loading...'}</h1>
      <h1>{isEnd && 'The end!'}</h1>
    </>
    )
}