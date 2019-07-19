import React, { Component } from 'react'
import axios from "axios"
import { Table } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { Radio } from 'antd';

import { Select } from 'antd';
import { Button } from 'antd';

const { Option } = Select;

const columns = [
    // {
    //   title: 'Full Name',
    //   width: 100,
    //   dataIndex: 'name',
    //   key: 'name',
    //   fixed: 'left',
    // },
    // {
    //   title: 'Age',
    //   width: 100,
    //   dataIndex: 'age',
    //   key: 'age',
    //   fixed: 'left',
    // },
    { title: '订单号', dataIndex: 'id', key: '1' },
    { title: '下单时间', dataIndex: 'date', key: '2' },
    { title: '用户名称', dataIndex: 'serviceName', key: '3' },
    { title: '手机号', dataIndex: 'phone', key: '4' },
    { title: '转单类型', dataIndex: 'type', key: '5' },
    { title: '贷款金额(万元)', dataIndex: 'money', key: '6' },
    { title: '订单状态', dataIndex: 'interestRate', key: '7' },
    { title: '客服', dataIndex: 'customerName', key: '8' },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a href="javascript:;">action</a>
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }
  ];

  

    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

    function onChange(date, dateString) {
    console.log(date, dateString);
    }

    function onChangeMoney(value) {
        console.log('changed', value);
      }

      function onChangeMoneySec(value) {
        console.log('changed', value);
      }

      function handleChange(value) {
        console.log(`selected ${value}`);
      }


export default class daikuanDD extends Component {

  constructor(props) {
    super(props);
    this.state={
      datajson:""
    }
  }
    render() {
        return (
            <div className="daikuanDD">
                <div>&nbsp;
                    处理时间:&nbsp;<RangePicker onChange={onChange} /> &nbsp;
                    金额范围:&nbsp;<InputNumber min={1} max={20} defaultValue={1} onChange={onChangeMoney} /> - <InputNumber min={1} max={20} defaultValue={20} onChange={onChangeMoneySec} />
                </div> <br/>
                <div>&nbsp;
                    处理状态: &nbsp;<span>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">全部</Radio.Button>
                                    <Radio.Button value="b">新订单</Radio.Button>
                                    <Radio.Button value="c">未审核</Radio.Button>
                                    <Radio.Button value="d">已接单</Radio.Button>
                                    <Radio.Button value="e">已完成</Radio.Button>
                                    <Radio.Button value="f">暂无状态</Radio.Button>
                                </Radio.Group>
                                </span>&nbsp;
                    转单类型:&nbsp; <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                                </Select>&nbsp;
                    客服名称:&nbsp;<Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                              
                                <Option value="Yiminghe">yiminghe</Option>
                                </Select>&nbsp;

                    <Button type="primary">查询</Button>
                </div><br/>
                <Table columns={columns} dataSource={this.state.datajson} scroll={{ x: 1300 ,y:300}} />
            </div>
        )
    }

    componentDidMount(){
      axios.get("http://localhost:3000/api/list?order=2").then(res=>{
        console.log(res.data.data,"res.data.list")
        this.setState({
          datajson:res.data.data
        })
      })
     }
}
