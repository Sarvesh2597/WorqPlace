import React, { useState } from 'react';
import { Media, Row } from 'reactstrap';
import moment from 'moment';
import { Check, Trash } from 'react-feather';
import { getLoggedInUser } from '../../../helpers/authUtils';
let userInfo = getLoggedInUser();
const TaskComment = (item) => {
    return (
        // <div className="comments-box">
        <Media style={{ marginTop: "1rem" }}>
            {/* <img src={item.author_avatar} className="mr-2 rounded-circle" height="36" alt="" /> */}

            <Media body>
                <h5 className="mt-0 mb-0 font-size-12">
                    <span className="float-right text-muted font-size-10">
                        {/* {moment(item.timestamp).format('DD-MM-YYYY HH:mm')} */}
                        {moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                    </span>
                    {item.userName}
                </h5>
                <p className="mt-1 mb-0 text-muted">
                    {`${item.message}  `}
                    {userInfo?.id === item?.userId && (
                        <Trash color="red" className="float-right" size="14px" style={{ cursor: 'pointer', marginTop: "5px" }}
                            onClick={() => {
                                item.deleteComment(item?._id)
                            }}
                        />
                    )}
                </p>
            </Media>
        </Media>
        // </div>
    );
};
export default function Comments(props) {
    const { onChangeComments, postComments, comments, deleteComment, } = props;
    const [showButton, setShowButton] = useState(false)
    // Add Comments Function will come here
    return (
        <React.Fragment>

            <Row style={{ margin: "10px 0px 10px 8px", display: "flex", justifyContent: "space-between" }}>
                <h6>Comments</h6>

            </Row>
            <div className="rounded" style={{ border: "1px solid #cbcbcb" }}>
                <div className="comment-area-box">
                    <textarea
                        rows="2"
                        className="form-control border-0 resize-none"
                        value={comments}
                        placeholder="Your comment..."
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                onChangeComments(e.target.value);
                                setShowButton(true);
                            } else {
                                setShowButton(false);
                            }
                        }} />
                </div>

            </div>
            <button disabled={!showButton} onClick={(e) => {
                setShowButton(false)
                postComments()
            }
            } className="check-circule btn-sm"
                style={{ float: "right" }}
            >Post
                    {/* <Check
                        size={15}
                        color="#fff"
                        style={{ cursor: "pointer", marginLeft: "-4px", marginTop: "-3px" }}
                    /> */}
            </button>

            {
                props.commentsData && (
                    <div style={{ marginTop: "4rem" }}>
                        {props.commentsData.map((item, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <TaskComment {...item} deleteComment={deleteComment} />
                                    <hr />
                                </React.Fragment>
                            );
                        })}
                    </div>
                )
            }
        </React.Fragment >
    );
}
