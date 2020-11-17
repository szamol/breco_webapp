import React from 'react'

import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { servAddr } from '../../../../utils/consts'

const SimilarCard = (props) => {

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Podobieństwa</Popover.Title>
          <Popover.Content>
              <ul>
            {
                props.details.tags.map((item, idx) => 
                    <li key={idx}>{item}</li>)
            }
            </ul>
          </Popover.Content>
        </Popover>
      );

    return (
        <div className="text-center justify-content-center border py-5">
            <Image
              variant="top" 
              src={servAddr + "/static/covers/" + props.details.cover}
              style={{ height: '15rem', width: '10rem'}}
            rounded/>
                <br/>
            <Link to={`/details/${props.details.isbn}`}>{props.details.title}</Link>
            <br />
            <br />
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose={true}>
                <Button variant="success"><b>{props.details.similarity}</b></Button>
            </OverlayTrigger>
        </div>
    )
}

export default SimilarCard