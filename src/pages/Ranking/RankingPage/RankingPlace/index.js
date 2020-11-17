import React from 'react'
import { Link } from 'react-router-dom'

const RankingPlace = (props) => {

    function setStyle() {
        if (props.place === 0) {
            return {
                backgroundColor: "gold",
                border: "1px solid goldenrod",
                fontSize: "35px"
            }
        } else if (props.place === 1) {
            return {
                backgroundColor: "silver",
                border: "1px solid lightgray",
                fontSize: "25px"
            }
        } else if (props.place === 2) {
            return {
                backgroundColor: "tan",
                border: "1px solid wheat"
            }
        }
    }

    return (
        <div style={setStyle()}
        className="p-5 mb-3 rounded">
            <b>
            <span className="float-left">{props.place + 1}</span>
            { props.item.isbn ?
            <Link to={`/details/${props.item.isbn}`}>{props.item.value}</Link>
            : 
            <span>{props.item.value}</span>
            }
            <span className="float-right">{props.item.pluses}</span>
            </b>
        </div>
    )
}

export default RankingPlace