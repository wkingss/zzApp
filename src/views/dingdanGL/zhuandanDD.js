import React, { Component } from 'react'
import axios from "axios"
import { Table } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { Radio } from 'antd';
import { Button } from 'antd';

import { Select } from 'antd';

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
    { title: '订单号', dataIndex: 'id', key: 'id' },
    { title: '下单时间', dataIndex: 'date', key: 'date' },
    { title: '用户名称', dataIndex: 'customerName', key: 'customerName' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '转单类型', dataIndex: 'type', key: 'type' },
    { title: '贷款金额(万元)', dataIndex: 'money', key: 'money' },
   //{ title: '订单状态', dataIndex: 'interestRate', key: 'interestRate' },
    { title: '客服', dataIndex: 'serviceName', key: 'serviceName' },
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

    // function onChange(date, dateString) {
    // console.log(date, dateString);
    // }

    // function onChangeMoney(value) {
    //     console.log('changed', value);
    //   }

    //   function onChangeMoneySec(value) {
    //     console.log('changed', value);
    //   }

      function handleChange(value) {
        console.log(`selected ${value}`);
      }


export default class zhuandanDD extends Component {

  constructor(props) {
    super(props);
    this.state={
      datajson:"",
      newDatajson:undefined,
      startTime:"",
      endTime:"",
      minMoney:0,
      maxMoney:0,
      handleState:5,
    }
  }

  searchBtnFn(){
    var newDatajson = this.state.datajson.filter(item=>{
      var date = new Date(item.date).getTime();
      var startData = new Date(this.state.startTime).getTime();
      var endData = new Date(this.state.endTime).getTime();

      return (date > startData && date < endData) && (item.money >= this.state.minMoney && item.money <= this.state.maxMoney) && (this.state.handleState == 5 ? true : item.handleState == this.state.handleState);
  });

  this.setState({newDatajson});
  console.log(newDatajson,"newDatajson")
  }
  
    render() {
        return (
            <div className="daikuanDD">
                <div>&nbsp;
                    处理时间:&nbsp;<RangePicker onChange={(date,dateString)=>{
                        console.log(dateString);
                        this.setState({startTime:dateString[0],endTime:dateString[1]});
                    }} /> &nbsp;
                    金额范围:&nbsp;<InputNumber min={1} max={20} defaultValue={1} onChange={(value)=>{ this.setState({ minMoney:value })}} /> - <InputNumber min={1} max={20} defaultValue={20} onChange={(value)=>{ this.setState({ maxMoney:value })}} />
                </div> <br/>
                <div>&nbsp;
                    处理状态: &nbsp;<span>
                                <Radio.Group defaultValue="a" buttonStyle="solid"  onChange={(e)=>{ this.setState({handleState: parseInt(e.target.value) }) }}>
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
                    <Button type="primary"  onClick={this.searchBtnFn.bind(this)}>查询</Button>
                </div><br/>
                <Table columns={columns} dataSource={this.state.newDatajson?this.state.newDatajson:this.state.datajson} scroll={{ x: 1300}} pagination={{pageSize:5}}/>
            </div>
        )
    }

    componentDidMount(){
      axios.get("http://localhost:3000/api/list?order=3").then(res=>{
        console.log(res.data.data,"res.data.list")
        this.setState({
          datajson:res.data.data
        })
      })
     }
}
