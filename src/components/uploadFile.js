import React, { Component } from 'react';
import { fetchReq, fetchStream } from '../utils/utils';

export default class CollapsableCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            fileName: null
        }

        this.singleFileUploadHandler = this.singleFileUploadHandler.bind(this);
    }

    singleFileUploadHandler = () => {
        const { selectedFile } = this.state;

        if (this.state.selectedFile) {
            const data = new FormData();

            data.append('username', 'abc123');

            // the name for file must be 'file' to match multer.single('file')
            data.append('file', selectedFile, selectedFile.name);

            const option = {
                // overwrite header to avoid default setting 'Content-Type': 'application/json' 
                headers: {
                    'accept': 'application/json'
                },
                body: data
            }

            fetchReq('/api/file/upload', option)
                .then(fileName => {
                    this.setState(fileName);
                    alert(`Successfully uploaded! Filename on server: ${fileName.fileName}`)
                })
                .catch(err => alert(err));
        }
    }

    singleFileDownloadHandler = () => {
        const { fileName } = this.state;

        if (fileName) {
          const option = {
            method: 'GET'
          }
          fetchStream(`/api/file/${fileName}`, option)
            .then(blob => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `${fileName}`);
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
            })
            .catch(err => alert(err));
        }
      }

    render() {
        const { fileName } = this.state;
        const { showDownload } = this.props;

        return (
            <div>
                <input
                    type="file"
                    onChange={e => this.setState({ selectedFile: e.target.files[0] })}
                />
                <label className='red'>*Notice: Only PDF Format is accepted and no more than 2 MB</label>
                <button onClick={this.singleFileUploadHandler}>Upload</button>
                {
                    (showDownload && fileName) ?
                        <div>
                            <button onClick={this.singleFileDownloadHandler}>Download</button>
                        </div>
                        : null
                }
            </div>
        )
    }
}