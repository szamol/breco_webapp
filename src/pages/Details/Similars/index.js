import React, { useEffect, useState } from 'react'
import ItemsCarousel from 'react-items-carousel'
import SimilarCard from './SimilarCard'

import { Button } from 'react-bootstrap'
import { servAddr } from '../../../utils/consts'

const Similars = (props) => {

    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeItemIndex, setActiveItemIndex] = useState(0)

      useEffect(() => {
        setIsLoading(true)
        getResults()
        setActiveItemIndex(0)
      }, [props.isbn])

      function getResults() {
        let url = servAddr + `/breco/get_similar_books?isbn=${props.isbn}`
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setResult(res.results)
            setIsLoading(false)
        })
      }
      
    return (
        <div className="mx-auto" style={{ maxWidth: '70vw' }}>
        {
            !isLoading &&
            <ItemsCarousel
                infiniteLoop={true}
                numberOfCards={4}
                slidesToScroll={2}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={setActiveItemIndex}
                rightChevron={<Button>{'->'}</Button>}
                leftChevron={<Button>{'<-'}</Button>}
                chevronWidth={60}
                outsideChevron={true}
                gutter={12}
              >
                {
                    result
                        .sort((a, b) => {return a.similarity < b.similarity})
                        .map((item, i) => <SimilarCard key={i} details={item} />)
                }
            </ItemsCarousel>
        }
        </div>
    )
}

export default Similars