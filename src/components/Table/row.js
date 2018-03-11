import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Cell from './cell';

class Row extends Component {


  render() {
    const {columns,record,index, style, height, textStyle, borderStyle} = this.props;
    let widthNum = 0;

    let cells = []
    for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const render = col.render;
        let text = record[col.dataIndex];
        widthNum+=Number(col.width);
        if (render) {
            text = render(text, record, index) || {};
        }
        cells.push(<Cell key={col.key|| col.dataIndex}  style={{height:height,minHeight:40}} flex={col.flex} width={col.width} textStyle={col.textStyle}>{text}</Cell>)
    }

    return (
      <View style={[
        widthNum && {width: widthNum},
        styles.row,
        style
      ]}>
      {cells}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
})

export default Row ;
