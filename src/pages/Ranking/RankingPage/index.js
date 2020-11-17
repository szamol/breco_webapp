import React from 'react'

import RankingPlace from './RankingPlace'


const RankingPage = (props) => {

    return (
        <div className="mt-5">
            {
                props.details.map((item, idx) => <RankingPlace key={idx} place={idx} item={item} />)
            }
        </div>
    )
}

export default RankingPage