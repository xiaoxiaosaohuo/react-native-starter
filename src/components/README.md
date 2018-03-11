# Checkbox

参数 | 描述| 类型| 默认值
---|---|---|---
checked  | 是否选中|bool|false
onChange | 选中回调|func|-
defaultChecked | 初始是否选中|bool|false
disabled | 是否可选|bool|false

# CheckboxGroup

参数 | 描述| 类型| 默认值
---|---|---|---
defaultValue  | 默认选中项|string[]|[]
onChange | 选中回调|func|-
value | 指定选中的选项|string[]|[]
options|可选项|string[]|[]




```
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];
<CheckboxGroup
    options={options}
    onChange = {onChange}
    defaultValue={[]}
    >
</CheckboxGroup>
```

# Radio

参数 | 描述| 类型| 默认值
---|---|---|---
checked |是否选中|bool|false
type |图标类型,danxuan,raido,ok,要在图标名称后面加checked和uncheck|string|'radio'
size |图标大小|string|'xs'
disabled |禁用 |bool |false
onChange |选中回调 |func|无
style |自定义样式 |object |无
radioStyle | 图标样式| object |无
label | label |string |无
defaultChecked | 默认选中 | bool|false
inverse |文本与图标反转|bool|无

# List

参数 | 描述| 类型| 默认值
---|---|---|---
dataArray |数据源| 普通集合 array|无
renderRow | 渲染行| func |无
renderLeftHiddenRow | 渲染左侧隐藏内容 |func |无
renderRighHiddenRow | 渲染右侧隐藏内容| func|无
leftOpenValue |向右滑动触发值|number|0
rightOpenValue |向左滑动触发值|number|0
swipeToOpenPercent |以滑动百分比来触发打开|%|50%
disableLeftSwipe | 不允许向左滑 |bool|false
disableRightSwipe |不允许向右滑|bool|true
onEndReached | 上拉加载触发函数 | func |无
isloadingMore | 上来加载状态 | bool | false
moreData | 上拉加载的数据 | array | []
pageNo | 当前请求页 | num |0
size | 请求数据条数，相当于pageSize| num | 20
onRefresh | 下来刷新触发函数 | func |无
isRefreshing | 刷新状态 | bool | false


# ListItem

参数 | 描述| 类型| 默认值
---|---|---|---
style |样式 |object |无
onPress | 按钮回调 | func |无
onLongPress | 长按回调 |func |无
underlayColor | underlayColor | string |无
itemDivider | 分割线 | bool |fasle
直接可包含子组件使用，不用使用view包裹，


```
<List
    dataSource={this.ds.cloneWithRows(dataSource)}
    renderRow={this.renderRow}
    renderRightHiddenRow={this.renderHiddenRow}
    disableRightSwipe={true}
    rightOpenValue={-75}
    enableEmptySections
    recalculateHiddenLayout={true}
/>
```

# Icon

参数 | 描述| 类型| 默认值
---|---|---|---
type  |图标类型项|string|无
size | 大小|string或者number|"md"
color | 颜色|string|'#000'
style|自定义样式|object|无



```
<Icon type="hetong" color ='white'></Icon>
```


# Button

参数 | 描述| 类型| 默认值
---|---|---|---
type  |类型|string(primary,info,waring,success,dark,light)|primary
size | 大小|small,large|默认大小
fill | 填充形式|block，full，rounded|无
style|自定义样式|object，两个属性，text和wrapper，分别应用到按钮和文本上|无
disabled | 是否禁用 | bool |false
onPress| 按钮回调 | func |无
activeOpacity | 透明度 | number |0.5
loading | 加载效果 | bool |false
transparent | 不添加任何颜色的文字按钮| bool |false



```
<Button size='large' disabled>看看看看扩</Button>
<Button size='small'>看看看看扩</Button>
<Button type='warning'>看看看看扩</Button>
<Button type='success' >看看看看扩</Button>
```


# Spin

参数 | 描述| 类型| 默认值
---|---|---|---
spinning  |类型|bool| 无

delay | 延迟 | number |300


```
<Spin spinning={loading}>
    <View>
    <Text>ll</Text>
    </View>
</Spin
```
# Toast
-  Toast.success(content, duration, onClose, mask)
- Toast.fail(content, duration, onClose, mask)
- Toast.info(content, duration, onClose, mask)
- Toast.loading(content, duration, onClose, mask)
- Toast.offline(content, duration, onClose, mask)
- Toast.hide()全局销毁

参数 | 描述| 类型| 默认值
---|---|---|---
content  |提示内容|react element 或string| 无
duration | 持续时间 | s |3
onClose | 关闭回调 | Function |无
mask |是否显示透明蒙层，防止触摸穿透 |Boolean|true
>  duration = 0 时，onClose 无效，toast 不会消失；隐藏 toast 需要手动调用 hide

# Thumbnail

参数 | 描述| 类型| 默认值
---|---|---|---
squar  |是否方形|bool| false
size | 大小 | small，large | 无
url |缩略图地址|string|无
style |自定义样式|object|无
prefix | 是否添加前缀，默认为true，自动添加'http://res.hualala.com'| string|http://res.hualala.com


# Notice

 参数 | 描述| 类型| 默认值
---|---|---|---
type  |提示类型 closable，link|string| false
icon | 图标 | string| 无
onPress |点击关闭或者操作区域的回调函数|func|无
style |自定义样式|object|无
scrollProps | 滚动配置| objec |{loop: false, leading: 500, trailing: 800, fps: 120, style: {}}


```
<NoticeBar scrollProps={{ loop: true, style: {  } }}>
  历史课的简历开放时间的方式建档立卡放假aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbcccccccccccccccceeeee
</NoticeBar>
```


# Badge 徽标
 参数 | 描述| 类型| 默认值
---|---|---|---
type | 类型| string | "danger"红色
style |  包裹的父容器样式 | object | 无
text | 提示文本信息 | string /number | 无
overflowCount | 为数字时，溢出位数
dot | 不展示数字，只有一个小红点 | boolean | false

# Delete 二次删除组件
 参数 | 描述| 类型| 默认值
---|---|---|---
onPress | 点击确认删除回调| func | 无
disabled | 是否可点击 | boolean | 无

# Label
Label 组件用于文本显示, 一般为单行的少量文字。
参数 | 描述| 类型| 默认值
---|---|---|---
label | 标题 | string | 无
value | 值 | string | 无
style | 包裹容器样式 | object | 无
labelStyle | label样式 | object | 无
valueStyle | value样式 | object | 无

# UnderlineTextbox 待下划线的输入框
参数 | 描述| 类型| 默认值
---|---|---|---
style | 样式 | object | 无
onChangeText | 文本改变回调 | func |无
onContentSizeChange | onContentSizeChange回调 | func | 无
value | 值 | string | 无
defaultValue | 默认值 | string | 无


# AutoComplete (android有问题，待改)
参数 | 描述| 类型| 默认值
---|---|---|---
data | 数据源 | array | []
onItemPress | 列表行点击回调 参数为 rowData| onChangeText | 输入框改变回调 |  无
placeholder |输入框占位符 | 无
onCancel  | 取消按钮回调 | 无
style | 应用到包裹该组件的容器| object | 无
hideResults | 隐藏列表 | bool | false
keyboardShouldPersistTaps | 如果当前界面有软键盘，那么点击scrollview后是否收起键盘，取决于本属性的设置 | string或者bool | 参考react-native 官方文档  
listStyle | 应用到结果列表 | object |无
onShowResults | 显示或者隐藏结果列表时调用 | func | 无
renderItem | 渲染数据行 | func |无
renderSeparator | 渲染分割符 | func | 无
children | 渲染自定义的textInput | 无 | 无


```
<AutoComplete
  data = {data}
  onCancel = {this.goBack}
  onChangeText={this.onChangeText}
  placeholder="输入人员名称或者申请ID"
  onItemPress = {this.onSelectEmp}
  renderItem={({empName,empID})=>(
      <Option key={empID} value={empName}>
        <Text>{empName}-{empID}</Text>
      </Option>
    )}
    />
```

# Textarea
参数 | 描述| 类型| 默认值
---|---|---|---
value | 值 | string |''
defaultValue | 默认值 | string |''
onChangeText | 文本改变回调 | func |无
rowSpan | 行数 | num | 4
placeholderTextColor | 占位符颜色 | string | 无
bordered | 是否要边框 | bool | true
underline | 是否显示下边线 | bool | true
style |  样式 | object | 无
# table组件 （暂时不支持滚动）
## Table
参数 | 描述| 类型| 默认值
---|---|---|---
data | 数据数组 | [] |无
columns | 表格列的配置描述，具体项见下表 | [] | 无
rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string|Function | 无
headerStyle | 表头样式 | object | 无
style | 表格样式 | object | 无


## columns
参数 | 描述| 类型| 默认值
---|---|---|---
title | 列头显示文字 | string|ReactNode | 无
dataIndex | 列数据在数据项中对应的 key | string | 无
key | React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 | string | 无
flex | 单元格占比 | number | 无
render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 | Function(text, record, index) {}
width | 列宽度 | number | 无

# FilterModal (弹出框用于多项菜单选择)
参数 | 描述| 类型| 默认值
---|---|---|---
visible | 是否可见 | boolean | false
onCancel | 取消回调 | func | 无
onOk | 确认回调 | func | 无
