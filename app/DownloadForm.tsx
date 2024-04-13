'use client'

import { useState } from 'react'

export function DownloadForm() {
  const [link, setLink] = useState('')

  return (
    <div>
      <input
        type='url'
        className='border p-1 w-full'
        value={link}
        onChange={(e) => {
          setLink(e.target.value)
        }}
      />

      <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-2' onClick={() => {
        // get uid from url
        const url = new URL(link)
        const trackId = url.searchParams.get('track_id')

        if (!trackId) {
          return
        }

        setLink('')
        window.open('/api/track?track_id=' + trackId)
      }}>
        <svg
          className='fill-current w-4 h-4 mr-2'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
        </svg>
        <span>下载GPX</span>
      </button>
    </div>
  )
}