import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImg } from '../../api/ajax'
import PropTypes from "prop-types"
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {

    static propTypes ={
        imgs:PropTypes.array
    }

    constructor(props){
        super(props)
        if(props.imgs &&　props.imgs.length>0){
            this.state.fileList = props.imgs.map((c,index) => ({
                uid:-index,
                name:c,
                status:'done',
                url:"http://localhost:5000/upload/"+c
            }))
        }
    }

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
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

    getImgs = () => {
        return this.state.fileList.map(c => c.name)
    }

    handleChange = async ({ file, fileList }) => {
        console.log(file.status)
        if (file.status === 'done') {
            // 修改fileList数组的最后一个元素
            if (file.response.status === 0) {
                message.success('上传图片成功')
                const { name, url } = file.response.data
                let listLength = fileList.length
                fileList[listLength - 1].name = name
                fileList[listLength - 1].url = url
            }else{
                message.success('上传图片失败')
            }
        } else if (file.status === 'removed') {
            const result = await reqDeleteImg(file.name)
            if (result.status === 0) {
                message.success("删除图片成功")
            } else {
                message.error("删除图片失败")
            }
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
