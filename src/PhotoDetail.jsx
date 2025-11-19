import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
export default function PhotoDetail() {
    const [photo, setPhoto] = useState()
    const [error, setError] = useState()
    const {id} = useParams()
    useEffect(() => {
        if (!id) return; 
        async function fetchData() {
            try {
                const fetcher = await fetch(`https://picsum.photos/id/${id}/info`)
                if (!fetcher.ok) {
                    throw new Error(`Không tìm thấy ảnh với ID: ${id}`);
                }
                const data = await fetcher.json()
                setPhoto(data)
            } catch (err) {
                console.error('Lỗi fetch ảnh chi tiết:', err)
                setError(err.message)
            }
        }
        fetchData()
    }, [id])
    if (error) {
        return <div>Lỗi: {error}</div>; 
    }

    if (!photo) {
        return <h1>Đang tải chi tiết ảnh...</h1>; 
    }
    return (
        <div className="flex flex-col items-center gap-2">
            <img src={photo.download_url}></img>
            <h1>Taken by {photo.author}</h1>
            <h2>{photo.title || 'Không có tiêu đề ảnh'}</h2>
            <p className="mb-4">{photo.description || 'Không có mô tả'}</p>
        </div>
    )
}