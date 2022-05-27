import React from 'react';
import { Col, Row } from 'reactstrap';
import img1 from '../../assets/images/small/img-1.jpg';
import img2 from '../../assets/images/small/img-2.jpg';
import img3 from '../../assets/images/small/img-3.jpg';



// const Event1 = () => (
//     <Media>
//         <div className="event-date text-center mr-4">
//             <div className=" avatar-sm rounded-circle bg-soft-primary">
//                 <span className="font-size-16 avatar-title text-primary font-weight-semibold">02</span>
//             </div>
//             <p className="mt-2">Jun</p>
//         </div>
//         <Media body>
//             <Card className="d-inline-block">
//                 <CardBody>
//                     <h5 className="mt-0">Event One</h5>
//                     <p className="text-muted">
//                         It will be as simple as occidental in fact it will be Occidental Cambridge friend
//                     </p>
//                     <div>
//                         <a href="/" className="btn btn-primary btn-sm">
//                             Read more
//                         </a>
//                     </div>
//                 </CardBody>
//             </Card>
//         </Media>
//     </Media>
// );

// const Event2 = () => (
//     <Media>
//         <div className="event-date text-center mr-4">
//             <div className=" avatar-sm rounded-circle bg-soft-primary">
//                 <span className="font-size-16 avatar-title text-primary font-weight-semibold">03</span>
//             </div>
//             <p className="mt-2">Jun</p>
//         </div>
//         <Media body>
//             <Card className="d-inline-block">
//                 <CardBody>
//                     <h5 className="mt-0">Event Two</h5>
//                     <p className="text-muted">
//                         To an English person, it will seem like simplified English, as a skeptical Cambridge friend of
//                         mine told me what Occidental
//                     </p>

//                     <ul className="text-muted">
//                         <li className="py-1">Sed ut perspiciatis unde</li>
//                         <li className="py-1">Nemo enim ipsam</li>
//                     </ul>
//                 </CardBody>
//             </Card>
//         </Media>
//     </Media>
// );

// const Event3 = () => (
//     <Media>
//         <div className="event-date text-center mr-4">
//             <div className=" avatar-sm rounded-circle bg-soft-primary">
//                 <span className="font-size-16 avatar-title text-primary font-weight-semibold">04</span>
//             </div>
//             <p className="mt-2">Jun</p>
//         </div>
//         <Media body>
//             <Card className="d-inline-block">
//                 <CardBody>
//                     <h5 className="mt-0">Event Three</h5>
//                     <p className="text-muted mb-4">
//                         At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium deleniti
//                     </p>
//                     <div className="album">
//                         <a href="/" className="mr-1">
//                             <img alt="" src={img1} />
//                         </a>
//                         <a href="/" className="mr-1">
//                             <img alt="" src={img2} />
//                         </a>
//                         <a href="/" className="mr-1">
//                             <img alt="" src={img3} />
//                         </a>
//                     </div>
//                 </CardBody>
//             </Card>
//         </Media>
//     </Media>
// );

// const Event4 = () => (
//     <Media>
//         <div className="event-date text-center mr-4">
//             <div className=" avatar-sm rounded-circle bg-soft-primary">
//                 <span className="font-size-16 avatar-title text-primary font-weight-semibold">05</span>
//             </div>
//             <p className="mt-2">Jun</p>
//         </div>
//         <Media body>
//             <Card className="d-inline-block">
//                 <CardBody>
//                     <h5 className="mt-0">Event Four</h5>
//                     <p className="text-muted mb-0">
//                         For science, music, sport, etc, Europe uses the same vocabulary their pronunciation and their
//                         most common words.
//                     </p>
//                 </CardBody>
//             </Card>
//         </Media>
//     </Media>
// );

const Activity = () => {
    return (
        <React.Fragment>
            <Row className="mt-5">
                <Col>
                    <h2 className="mb-5 text-center font-weight-strong">Project Activity</h2>

                    <div className="timeline" dir="ltr">
                        <article className="timeline-item">
                            <h2 className="m-0 d-none">&nbsp;</h2>
                            <div className="time-show mt-0">
                                <a href="/" className="btn btn-primary width-lg">
                                    Today
                                </a>
                            </div>
                        </article>

                        <article className="timeline-item timeline-item-left">
                            <div className="timeline-desk">
                                <div className="timeline-box clearfix">
                                    <span className="timeline-icon"></span>
                                    <div className="event-date float-right text-center ml-4">
                                        <div className=" avatar-sm rounded-circle bg-soft-primary">
                                            <span className="font-size-16 avatar-title text-primary font-weight-semibold">
                                                02
                                            </span>
                                        </div>
                                        <p className="mt-2">Jun</p>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="mt-0">Event One</h5>
                                                <p className="text-muted">
                                                    At solmen va esser necessi far uniform grammatica, pronunciation e
                                                    plu sommun paroles. Ma quande lingues coalesce li del resultant.
                                                </p>
                                                <p className="text-muted">
                                                    It will be as simple as in fact, it will be Occidental.
                                                </p>
                                                <div>
                                                    <a href="/" className="btn btn-primary btn-sm">
                                                        Read more
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="timeline-item">
                            <div className="timeline-desk">
                                <div className="timeline-box clearfix">
                                    <span className="timeline-icon"></span>
                                    <div className="event-date float-left text-center mr-4">
                                        <div className=" avatar-sm rounded-circle bg-soft-primary">
                                            <span className="font-size-16 avatar-title text-primary font-weight-semibold">
                                                03
                                            </span>
                                        </div>
                                        <p className="mt-2">Jun</p>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="mt-0">Event Two</h5>
                                                <p className="text-muted">
                                                    If several languages coalesce, the grammar of the resulting language
                                                    is more simple and regular than that of the individual languages
                                                </p>
                                                <ul className="text-muted mb-0">
                                                    <li className="py-1">Sed ut perspiciatis unde</li>
                                                    <li className="py-1">Nemo enim ipsam</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="timeline-item timeline-item-left">
                            <div className="timeline-desk">
                                <div className="timeline-box clearfix">
                                    <span className="timeline-icon"></span>
                                    <div className="event-date float-right text-center ml-4">
                                        <div className=" avatar-sm rounded-circle bg-soft-primary">
                                            <span className="font-size-16 avatar-title text-primary font-weight-semibold">
                                                04
                                            </span>
                                        </div>
                                        <p className="mt-2">Jun</p>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="mt-0">Event Three</h5>
                                                <p className="text-muted mb-4">
                                                    Everyone realizes why a new common language would be desirable: one
                                                    could refuse to pay expensive translators.
                                                </p>
                                                <div className="timeline-album">
                                                    <a href="/" className="mr-1">
                                                        <img alt="" src={img1} />
                                                    </a>
                                                    <a href="/" className="mr-1">
                                                        <img alt="" src={img2} />
                                                    </a>
                                                    <a href="/" className="mr-1">
                                                        <img alt="" src={img3} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="timeline-item">
                            <div className="timeline-desk">
                                <div className="timeline-box clearfix">
                                    <span className="timeline-icon"></span>
                                    <div className="event-date float-left text-center mr-4">
                                        <div className=" avatar-sm rounded-circle bg-soft-primary">
                                            <span className="font-size-16 avatar-title text-primary font-weight-semibold">
                                                04
                                            </span>
                                        </div>
                                        <p className="mt-2">Jun</p>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="mt-0">Event One</h5>
                                                <p className="text-muted">
                                                    Their separate existence is a myth. For science, music, sport, etc,
                                                    Europe uses the same vocabulary. The languages only differ their
                                                    pronunciation
                                                </p>
                                                <p className="text-muted mb-0">
                                                    To an English person, it will seem like simplified English as a
                                                    skeptical Cambridge friend of mine told me what occidental
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Activity;
