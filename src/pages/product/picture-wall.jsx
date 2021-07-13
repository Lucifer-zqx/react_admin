import React, { Component } from 'react'
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
            /* {
                uid: '-1', //上传图片id
                name: 'image.png', //图片名称
                status: 'done',  //上传状态
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //图片的url
            } */
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ file, fileList }) => {
        console.log('handleChange()',file.status, file, fileList)
        if(file.status === 'done'){
            // 修改fileList
            const {name,url} = file.response.data
            fileList.name = name
            fileList.url = url
        }
        
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div>上传图片</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    name='image'
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    accept='image/*'
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
