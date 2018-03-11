import React, { Component } from 'react';
import { View, Text,StyleSheet,ListView } from 'react-native';
import variables from "../../utils/platform";
import Row from "./row";
import Cell from "./cell";

//把数据和columns传下去，迭代rows,rows.渲染一系列的row。
class Table extends Component {
    constructor(props){
        super(props)
        this.state={
             data: props.data,

        }
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.widthNum = 0;
    }
    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps) {
          this.setState({
            data: nextProps.data,
          });
        }
    }
    getThs = ()=> {
        const {columns} = this.props;
        let ths = [];

        ths = ths.concat(columns);
        return ths.map((c)=> {
            this.widthNum+=c.width;
            return <Cell key={c.key||c.dataIndex} flex={c.flex} width={c.width} header>{c.title}</Cell>;
        });
    }
    renderRow = (record,sectionID,rowID)=>{
        const {rowKey,columns} = this.props;
        const recordKey = (typeof rowKey === 'function') ?
        rowKey(record, rowID) :rowKey;
        const key = recordKey === undefined ? rowID : recordKey;
        return <Row
        key={key}
        record={record}
        index={rowID}
        columns={columns}
        ></Row>
    }

  render() {
    const header = this.getThs();
    const {headerStyle} = this.props;
    let thead =(
        <View
            style={[
                styles.theader,
                this.widthNum&&{width:this.widthNum},
                headerStyle
            ]}

            >
            {header}
        </View>
    )
    const dataSource = this.ds.cloneWithRows(this.state.data)
    return (
      <View style={[
          styles.table,
        this.widthNum&&{width:this.widthNum},
        this.props.style,

      ]}>
        {thead}
        <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            >

        </ListView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    table:{
      borderLeftWidth: variables.borderWidth,
      borderBottomWidth: variables.borderWidth,
      borderColor: variables.listBorderColor,
      // marginVertical:variables.v_spacing_sm
    },
    theader:{
        height:40,
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor:"#f5f6fa",
    }
})
Table.defaultProps={
    data :[],
    columns:[],
    rowKey:"key",

}
export default Table;
