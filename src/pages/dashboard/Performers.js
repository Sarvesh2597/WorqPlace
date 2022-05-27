import React from 'react';
import { Button, Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown } from 'reactstrap';
import img9 from '../../assets/images/users/Img-9.jfif';
import img10 from '../../assets/images/users/Img10.jfif';
import img11 from '../../assets/images/users/Img11.jfif';
import img12 from '../../assets/images/users/img12.jpg';


const Member = ({ image, name, description, time, className }) => {
    return (
        <Media className="mt-1 border-top pt-3">
            <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-0">{description}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{time}</h6>
            </Media>
        </Media>

        // <Media className="mt-1 border-top pt-3">
        //     <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
        //     <Media body>
        //         <Row>
        //             <Col>
        //                 <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col sm={6}>
        //                 <h6 className="text-muted font-weight-normal mt-1 ">{description}</h6>
        //             </Col>
        //             <Col sm={6}>
        //                 <h6 className="text-muted font-size font-weight-normal mb-3">{time}</h6>
        //             </Col>
        //         </Row>
        //     </Media>
        // </Media>
    );
};

const Performers = () => {
    return (
        <Card className="grid-cards" style={{ maxHeight: '445px' }}>
            <CardBody className="pb-0 pt-2">
                <UncontrolledDropdown className="mt-2 pt-1 float-right ml-2">
                    <DropdownToggle tag="button" className="btn btn-link arrow-none p-0 text-muted">
                        <i className="uil uil-ellipsis-v "></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem className="text-info">
                            <i className="uil uil-pen mr-2"></i>Unpin
                        </DropdownItem>

                        <DropdownItem divider />
                        <DropdownItem className="text-danger">
                            <i className="uil uil-trash mr-2"></i>Delete
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

                <Button className="float-right mt-2" size={'sm'} color="primary">
                    View All
                </Button>

                <h5 className="mb-3 header-title">Emails</h5>

                <Member image={img10} name="Sanket" description="Regarding Template Design" time="24 Aug, 7:00" />
                <Member
                    image={img12}
                    name="Abhishek"
                    description="About feature - login system ..."
                    time="24 Aug, 7:00"
                />
                <Member
                    image={img11}
                    name="Krishna"
                    description="Regarding template design and icons sent previously."
                    time="24 Aug, 7:00"
                />
                <Member
                    image={img9}
                    name="Salman"
                    description="About the bugs in admin dashboard"
                    time="24 Aug, 7:00"
                />
            </CardBody>
        </Card>
    );
};

export default Performers;
