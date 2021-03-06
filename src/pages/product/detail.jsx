import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategoryInfoById } from "../../api/ajax"
import { BASE_IMG_URL } from "../../utils/constant"
const Item = List.Item
export default class ProductDetail extends Component {

    state = {
        pCategory: '',
        category: ''
    }


    async componentDidMount() {
        const { categoryId, pCategoryId } = this.props.location.state
        if (pCategoryId !== '0') {
            const result = await Promise.all([reqCategoryInfoById(pCategoryId), reqCategoryInfoById(categoryId)])
            const pCategory = result[0].data.name
            const category = result[1].data.name
            this.setState({ pCategory, category })
        }else{
            const result = await reqCategoryInfoById(categoryId)
            const pCategory = result.data.name
            this.setState({ pCategory})
        }
        

    }
    render() {
        const { name, desc, price, imgs, detail } = this.props.location.state
        const { pCategory, category } = this.state
        const title = <span><LinkButton onClick={() => this.props.history.goBack()}><Icon type="arrow-left" style={{ marginRight: 12 }} /></LinkButton>商品详情</span>
        return (
            <Card title={title}>
                <List>
                    <Item>
                        <div>
                            <span className="left">商品名称:</span>
                            <span>{name}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品描述:</span>
                            <span>{desc}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品价格:</span>
                            <span>{price}元</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">所属分类:</span>
                            <span>{pCategory}{category ? ' --> '+category:null}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品图片:</span>
                            {
                                imgs.length !== 0 ? imgs.map(c => <img className="detail-img" key={c} src={BASE_IMG_URL + c} alt="图片加载失败" />
                                ) : <span>该商品没有图片信息</span>
                            }

                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品详情:</span>
                            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                        </div>
                    </Item>
                </List>
            </Card>
        )
    }
}
