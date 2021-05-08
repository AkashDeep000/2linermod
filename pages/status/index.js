import { useSWRInfinite } from 'swr'
import { useRef, useEffect } from 'react'

import fetcher from '../../libs/fetch'
import useOnScreen from '../../hooks/useOnScreen'
const Build = process.env.CONFIG_BUILD_ID;
let PAGE_SIZE = 1000//issues[0].pageProps.total

const getKey = (pageIndex, previousPageData, pageSize) => {
  if (previousPageData && !previousPageData.pageProps) return null // reached the end

  return `/_next/data/${Build}/1.json`
}

export default function () {
  const ref = useRef()
  

  const isVisible = useOnScreen(ref)

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, PAGE_SIZE),
    fetcher
  )
  const dat = data
  const issues = dat ? [].concat(...dat) : []
  
  console.log(issues) 
  const isLoadingInitialData = !dat && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && dat && typeof dat[size - 1] === 'undefined')
  const isEmpty = dat?.[0]?.length === 0
  const isReachingEnd = size === PAGE_SIZE
  const isRefreshing = isValidating && dat && dat.length === size

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])
console.log(issues)




  return (
    <div style={{ fontFamily: 'sans-serif' }}>
     
     
      {isEmpty ? <p>Yay, no issues found.</p> : null}
          {issues.map((issue) => {
        return (
           <div>
    
      <ul>
              
            
            
                        <li key={issue.pageProps.data}>
                         <br />
          <br />
             <br />
          <br />
            <h1>Please{issue.pageProps.tim}</h1>
          <br />
          <br />
             <br />
          <br />
          </li>
              
         
            
                </ul>
    </div>
        )
      })}
       <div ref={ref}>
        {isLoadingMore ? (<div className="spinner" role="spinner"><div className="spinner-icon"></div></div>) : isReachingEnd ? 'no more issues' : ''}
      </div>
    </div>
  )
}