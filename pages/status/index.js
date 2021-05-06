import { useSWRInfinite } from 'swr'
import { useRef, useEffect } from 'react'

import fetcher from '../../libs/fetch'
import useOnScreen from '../../hooks/useOnScreen'
const Build = process.env.CONFIG_BUILD_ID;


const PAGE_SIZE = 10

const getKey = (pageIndex, previousPageData, pageSize) => {
  if (previousPageData && !previousPageData.length) return null // reached the end

  return `https://modapk.vercel.app/_next/data/${Build}/status/{pageIndex + 1}.json`
}

export default function () {
  const ref = useRef()
  

  const isVisible = useOnScreen(ref)

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, PAGE_SIZE),
    fetcher
  )

  const issues = data ? [].concat(...data) : []
  console.log(issues) 
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = size === PAGE_SIZE
  const isRefreshing = isValidating && data && data.length === size

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
     
     
      {isEmpty ? <p>Yay, no issues found.</p> : null}
      
{
    issues.map((issue) =>  {
        return (

          <p key={issue.pageProps.status[0]._id} style={{ margin: '6px 0', height: 50 }}>
            - {issue.pageProps.status[0]. content}
          </p>
          )

})}
      <div ref={ref}>
        {isLoadingMore ? 'loading...' : isReachingEnd ? 'no more issues' : ''}
      </div>
    </div>
  )
}