import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Input, Button, UncontrolledAlert } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

import { BASE_URL } from '../../constants/endpoint';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
import { Redirect } from 'react-router-dom';

class CreateDoc extends Component {
    constructor(props) {
        super(props);
        const docs = JSON.parse(window.localStorage.getItem('docs'));
        const selectedTeam = getSelectedTeam();
        const userInfo = getLoggedInUser();
        this.state = {
            postDoc: docs ? docs : { teamId: selectedTeam._id },
            err: false,
            message: '',
            formSubmitted: false,
            selectedDoc: docs ? docs : null,
            userInfo,
            editTitle: false,
        };
    }

    componentDidMount() {}
    componentWillUnmount() {
        window.localStorage.setItem('docs', null);
    }

    postDocs = () => {
        fetch(BASE_URL + '/document/markdownfile', {
            method: 'POST',
            body: JSON.stringify(this.state.postDoc),
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.error) {
                    this.setState({
                        isLoading: false,
                        err: true,
                        message: 'Error occured while Adding document',
                    });
                } else {
                    this.setState({
                        isLoading: false,
                    });
                    window.localStorage.setItem('docs', null);
                    this.setState({
                        formSubmitted: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    updateDocs = () => {
        const payload = {
            fileContent: this.state.postDoc.fileContent,
            isDraftFlaged: this.state.postDoc.isDraftFlaged,
            fileName: this.state.postDoc.fileName,
        };
        fetch(BASE_URL + '/document/markdownfile/' + this.state.selectedDoc._id, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.error) {
                    this.setState({
                        isLoading: false,
                        err: true,
                        message: 'Error occured while updating document',
                    });
                } else {
                    this.setState({
                        isLoading: false,
                    });
                    window.localStorage.setItem('docs', null);
                    this.setState({
                        formSubmitted: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    render() {
        if (this.state.formSubmitted) {
            return <Redirect to="/docs"></Redirect>;
        }
        return (
            <div style={{ paddingTop: '1rem' }}>
                <Row>
                    <Col
                        lg={
                            !this.state.selectedDoc || (this.state.selectedDoc && this.state.selectedDoc.isDraftFlaged)
                                ? 9
                                : 11
                        }>
                        <Row>
                            <Col lg={3}>
                                {this.state.editTitle ? (
                                    <Input
                                        type="text"
                                        id="fileName"
                                        name="fileName"
                                        className="mb-4"
                                        value={this.state.postDoc.fileName}
                                        onChange={(e) =>
                                            this.setState({
                                                postDoc: { ...this.state.postDoc, fileName: e.target.value },
                                            })
                                        }
                                        onMouseOut={(e) => {
                                            this.setState({
                                                editTitle: false,
                                            });
                                        }}
                                    />
                                ) : (
                                    <h5
                                        onClick={(e) => {
                                            this.setState({
                                                editTitle: true,
                                            });
                                        }}
                                        className="text-muted">
                                        {this.state.postDoc.fileName
                                            ? this.state.postDoc.fileName
                                            : 'Untitled Document'}
                                    </h5>
                                )}
                            </Col>
                        </Row>
                    </Col>
                    {!this.state.selectedDoc || (this.state.selectedDoc && this.state.selectedDoc.isDraftFlaged) ? (
                        <Col lg={2}>
                            <Button
                                style={{ padding: '0.3rem 0.5rem' }}
                                color="warning"
                                onClick={(e) => {
                                    this.setState({
                                        postDoc: { ...this.state.postDoc, isDraftFlaged: true },
                                    });
                                    setTimeout(() => {
                                        this.state.selectedDoc ? this.updateDocs() : this.postDocs();
                                    }, 100);
                                }}
                                className="float-right text-dark">
                                Save As Draft
                            </Button>
                        </Col>
                    ) : null}
                    <Col lg={1}>
                        <Button
                            style={{ padding: '0.3rem 0.5rem' }}
                            color="success"
                            onClick={(e) => {
                                this.setState({
                                    postDoc: { ...this.state.postDoc, isDraftFlaged: false },
                                });
                                setTimeout(() => {
                                    this.state.selectedDoc ? this.updateDocs() : this.postDocs();
                                }, 100);
                            }}
                            className="float-right mr-3">
                            Publish
                        </Button>
                    </Col>
                </Row>
                <Card style={{ marginTop: '1rem' }}>
                    {this.state.err && this.state.message ? (
                        <UncontrolledAlert color="danger">{this.state.message}.</UncontrolledAlert>
                    ) : this.state.message ? (
                        <UncontrolledAlert color="success ">{this.state.message}.</UncontrolledAlert>
                    ) : null}
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.selectedDoc ? this.state.selectedDoc.fileContent : null}
                        config={{
                            toolbar: ['heading', '|', 'bold', 'italic', 'underline', 'fontColor', '|', 'numberedList', 'bulletedList', 'indent', 'outdent', '|', 'imageInsert', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo', 'codeBlock', 'todoList', 'subscript', 'superscript', 'strikethrough'],
                        }}
                        onInit={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle('height', '72vh', editor.editing.view.document.getRoot());
                            });
                        }}
                        onChange={(event, editor) => {
                            function getClearText(strSrc) {
                                return strSrc.replace(/<[^<|>]+?>/gi, '');
                            }
                            const data = editor.getData();
                            let clear_text = getClearText(data);
                            const post = { ...this.state.postDoc };
                            post['fileContent'] = data;
                            this.setState({
                                postDoc: post,
                            });
                        }}
                    />
                </Card>
            </div>
        );
    }
}

export default CreateDoc;
