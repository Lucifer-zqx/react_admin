import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react'
import { Button, Card } from 'antd'
export default class Bar extends Component {

    state={
        products:[120, 200, 150, 80, 70, 110, 130],
        storage:[100, 150, 170, 50, 90, 140, 80]
    }

    update = () =>{
        this.setState(state => ({
            products:state.products.map(c => c+10),
            storage:state.storage.reduce((pre,c)=>{
                pre.push(c-10)
                return pre
            },[])
        }))
    }

    getOption = (products,storage)=>{
        return  {
            xAxis: {
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {},
            legend: {
                data:['销量','库存']
            },
            series: [{
                name:'销量',
                data: products,
                type: 'bar'
            },{
                name:'库存',
                data: storage,
                type: 'bar'
            }]
        }
    }

    render() {
        const {products,storage} =this.state
        return (
            <Card title={<Button type='primary' onClick={this.update}>更新</Button>}>
                <Card title='柱状图'>
                    <ReactECharts option={this.getOption(products,storage)} />
                </Card>
            </Card>
        )
    }
}
