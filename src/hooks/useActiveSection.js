import { useState, useEffect } from 'react'

export function useActiveSection(myIndex) {
  const [visited, setVisited] = useState(myIndex === 0)
  useEffect(() => {
    const handler = (e) => {
      if (e.detail.section === myIndex) setVisited(true)
    }
    window.addEventListener('sectionChange', handler)
    return () => window.removeEventListener('sectionChange', handler)
  }, [myIndex])
  return visited
}
