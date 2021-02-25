
function LoadingSkeleton() {
  const SingleLoadingSkeleton = () => {
    return (
      <div className='loading-skeleton animation-pulse d-flex'>
        <div className='skeleton-image'></div>
        <div className='d-flex flex-column-wrap justify-content-between skeleton-metadata'>
          <div className='skeleton-title'>
            <div className='skeleton-title-first-line'></div>
            <div className='skeleton-title-second-line'></div>
          </div>
          <div className='skeleton-btn'></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SingleLoadingSkeleton />
      <SingleLoadingSkeleton />
      <SingleLoadingSkeleton />
      <SingleLoadingSkeleton />
    </>
  )
}

export default LoadingSkeleton;