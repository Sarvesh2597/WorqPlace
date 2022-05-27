import React from 'react';
import { Card, CardBody, Media } from 'reactstrap';


const Member = ({ image, name, description, time, className }) => {
    return (
        <Media className="mt-1 border-top pt-3">
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-0">{description}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{time}</h6>
            </Media>
        </Media>
    );
};

const Performers = () => {
    return (
        <Card>
            <CardBody className="pb-0 pt-2">
                <h5 className="mb-3 header-title">Docs</h5>

                <Member name="API Details" description="End points for testing APIs." />
                <Member name="Authentication system design" description="OAuth 2.0 POC" />
            </CardBody>
        </Card>
    );
};

export default Performers;
