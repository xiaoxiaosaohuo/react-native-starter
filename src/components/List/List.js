import React, { Component } from 'react';
import {
	FlatList,
	 View,
	 Text,
	 RefreshControl,
	 ActivityIndicator,
	 Dimensions
  } from 'react-native';
import Button from "../Button";
import  SwipeRow  from './SwipeRow';
import {debounce,isEqual} from "lodash"
import RefreshState from './refreshState';
import RefreshFooter from "./footer";

const deviceHeight = Dimensions.get("window").height;
class List extends Component {

	constructor(props) {
		super(props);
		this._rows = {};
		this.openCellKey = null;
		this.state = {
			dataSource: props.data||[],
			isRefreshing: false,  // 头部是否正在刷新
      		isloadingMore: false,  // 尾部是否正在刷新
      		footerState: RefreshState.Inital, // 尾部当前的状态，默认为Idle，不显示控件
		};
		// this.onEndReached = debounce(this.onEndReached,2000);
	}

	componentWillReceiveProps(nextProps) {
		//更新数据
		const {refreshState,data} = nextProps;
		if(refreshState!==this.props.refreshState){
			this.endRefreshing(refreshState)
		}
		this.setState({
			dataSource:data||[]
		})
	}

	setScrollEnabled(enable) {
		if (this._listView && this._listView.setNativeProps) {
			this._listView.setNativeProps({scrollEnabled: enable});
		} else if (this._listView && this._listView.getScrollResponder) {
			const scrollResponder = this._listView.getScrollResponder();
			scrollResponder.setNativeProps && scrollResponder.setNativeProps({scrollEnabled: enable});
		}
		this.props.onScrollEnabled && this.props.onScrollEnabled(enable);
	}
	setRefs(ref) {
		this._listView = ref;
		this.props.listViewRef && this.props.listViewRef(ref);
	}

	safeCloseOpenRow = ()=> {
		const rowRef = this._rows[this.openCellKey];
		if (rowRef && rowRef.closeRow) {
			this._rows[this.openCellKey].closeRow();
		}
	}

	rowSwipeGestureBegan = (key)=> {
		if (this.props.closeOnRowBeginSwipe && !!this.openCellKey && this.openCellKey !== key) {
			this.safeCloseOpenRow();
		}

		if (this.props.swipeGestureBegan) {
			this.props.swipeGestureBegan(key);
		}
	}

	onRowOpen = (key)=> {
		if (!!this.openCellKey && this.openCellKey !== key) {
			this.safeCloseOpenRow();
		}
		this.openCellKey = key;
		this.props.onRowOpen && this.props.onRowOpen(key, this._rows);
	}

	onRowPress = ()=> {
		if (!!this.openCellKey) {
			if (this.props.closeOnRowPress) {
				this.safeCloseOpenRow();
				this.openCellKey = null;
			}
		}
	}
	closeRow = ()=> {
		if (!!this.openCellKey) {
			this.safeCloseOpenRow();
			this.openCellKey = null;
		}
	}

	onScroll = (e)=> {
		if (!!this.openCellKey) {
			if (this.props.closeOnScroll) {
				this.safeCloseOpenRow();
				this.openCellKey = null;
			}
		}
		this.props.onScroll && this.props.onScroll(e);
	}
	onDelete = ({key,value})=>{
		this.setState(prevState=>{
			return{
				dataSource:prevState.dataSource.filter(d=>d[key]!==value)
			}
		})
	}
	onRefresh = () => {
		this.props.onRefresh&&this.beginHeaderRefresh();
	}
	renderCell = (VisibleComponent, HiddenComponent, key, item, shouldPreviewRow)=> {
			if (!HiddenComponent) {
				return React.cloneElement(
					VisibleComponent,
					{
						...VisibleComponent.props,
						ref: row => this._rows[key] = row,
					}
				);
			} else {
				return (
					<SwipeRow
						ref={row => this._rows[key] = row}
						swipeGestureBegan={ _ => this.rowSwipeGestureBegan(key) }
						onRowOpen={ _ => this.onRowOpen(key) }
						onRowDidOpen={ _ => this.props.onRowDidOpen && this.props.onRowDidOpen(key, this._rows)}
						onRowClose={ _ => this.props.onRowClose && this.props.onRowClose(key, this._rows) }
						onRowDidClose={ _ => this.props.onRowDidClose && this.props.onRowDidClose(key, this._rows) }
						onRowPress={ _ => this.onRowPress(key) }
						closeRow={_ => this.closeRow(key)}
						setScrollEnabled={ (enable) => this.setScrollEnabled(enable) }
						leftOpenValue={item.leftOpenValue || this.props.leftOpenValue}
						rightOpenValue={item.rightOpenValue || this.props.rightOpenValue}
						closeOnRowPress={item.closeOnRowPress || this.props.closeOnRowPress}
						disableLeftSwipe={item.disableLeftSwipe || this.props.disableLeftSwipe}
						disableRightSwipe={item.disableRightSwipe || this.props.disableRightSwipe}
						stopLeftSwipe={item.stopLeftSwipe || this.props.stopLeftSwipe}
						stopRightSwipe={item.stopRightSwipe || this.props.stopRightSwipe}
						recalculateHiddenLayout={this.props.recalculateHiddenLayout}
						style={this.props.swipeRowStyle}
						preview={shouldPreviewRow}
						previewDuration={this.props.previewDuration}
						previewOpenValue={this.props.previewOpenValue}
						tension={this.props.tension}
						friction={this.props.friction}
						directionalDistanceChangeThreshold={this.props.directionalDistanceChangeThreshold}
						swipeToOpenPercent={this.props.swipeToOpenPercent}
						swipeToOpenVelocityContribution={this.props.swipeToOpenVelocityContribution}
						swipeToClosePercent={this.props.swipeToClosePercent}
					>
						{HiddenComponent}
						{VisibleComponent}
					</SwipeRow>
				);
			}
		}
	renderItem = (rowData, rowMap)=> {
		const Component = this.props.renderItem(rowData, rowMap);
		const HiddenComponent = this.props.renderRightHiddenRow && this.props.renderRightHiddenRow(rowData, rowMap);
		let { item, index } = rowData;
		let { key } = item;
		if (!key && this.props.keyExtractor) {
			key = this.props.keyExtractor(item, index);
		}
		if(key===undefined||key===null){
			key=String(index)
		}
		const shouldPreviewRow = this.props.previewRowKey === key;
		return this.renderCell(Component, HiddenComponent, key, item, shouldPreviewRow);
	}
	/// 开始下拉刷新
	beginHeaderRefresh = ()=> {
		if (this.shouldStartHeaderRefreshing()) {
		  this.startHeaderRefreshing();
		}
	}
	/// 开始上拉加载更多
	beginFooterRefresh = ()=> {
		console.log("beginFooterRefresh",this.shouldStartFooterRefreshing());
		if (this.shouldStartFooterRefreshing()) {
		  this.startFooterRefreshing();
		}
	}
	/***
   * 当前是否可以进行下拉刷新
   * @returns {boolean}
   *
   * 如果列表尾部正在执行上拉加载，就返回false
   * 如果列表头部已经在刷新中了，就返回false
   */
	shouldStartHeaderRefreshing = ()=> {
		if (this.state.footerState === RefreshState.Refreshing ||
		  this.state.isRefreshing ||
		  this.state.isloadingMore) {
		  return false;
		}
		return true;
	}
	/***
   * 当前是否可以进行上拉加载更多
   * @returns {boolean}
   *
   * 如果底部已经在刷新，返回false
   * 如果底部状态是没有更多数据了，返回false
   * 如果头部在刷新，则返回false
   * 如果列表数据为空，则返回false（初始状态下列表是空的，这时候肯定不需要上拉加载更多，而应该执行下拉刷新）
   */
  shouldStartFooterRefreshing = ()=> {
    if (this.state.footerState === RefreshState.Refreshing ||
      this.state.footerState === RefreshState.NoMoreData ||
      this.props.data.length === 0 ||
      this.state.isRefreshing ||
      this.state.isloadingMore) {
      return false;
    }
    return true;
  }
  /// 下拉刷新，设置完刷新状态后再调用刷新方法，使页面上可以显示出加载中的UI，注意这里setState写法
  startHeaderRefreshing = ()=> {
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.props.onRefresh && this.props.onRefresh();
      }
    );
  }
  startFooterRefreshing = ()=> {
    this.setState(
      {
        footerState: RefreshState.Refreshing,
        isloadingMore: true
      },
      () => {
        this.props.onLoadMore && this.props.onLoadMore();
      }
    );
  }
  /**
   * 根据尾部组件状态来停止刷新
   * @param footerState
   *
   * 如果刷新完成，当前列表数据源是空的，就不显示尾部组件了。
   * 这里这样做是因为通常列表无数据时，我们会显示一个空白页，如果再显示尾部组件如"没有更多数据了"就显得很多余
   */
	endRefreshing = (footerState)=> {
		let footerRefreshState = footerState;
		if (this.props.data.length === 0) {
		  footerRefreshState = RefreshState.Initial;
		}
		this.setState({
		  footerState: footerRefreshState,
		  isRefreshing: false,
		  isloadingMore: false
		})
	}

	renderFooter = () => {
	    return (
	      <RefreshFooter
	        state={this.state.footerState}
	        onRetryLoading={this.beginFooterRefresh}
	      />
	    )
  	};
	render() {
        const {children,data,renderItem,renderRightHiddenRow,onRefresh,refreshState,...rest } = this.props;
		const {dataSource,isRefreshing} = this.state;
        return (
			<FlatList
				{...rest}
				data = {dataSource}
				ref={ c => this.setRefs(c) }
				onRefresh={this.onRefresh}
				refreshing={isRefreshing}
				onScroll={ e => this.onScroll(e) }
				renderItem={(rowData) => this.renderItem(rowData, this._rows)}
				onEndReached={this.beginFooterRefresh}
				onEndReachedThreshold={0.05}
				ListFooterComponent={this.renderFooter}
			/>
        );

	}

}
List.defaultProps={
	data:[],
	leftOpenValue: 0,
	rightOpenValue: 0,
	closeOnRowBeginSwipe: true,
	closeOnScroll: true,
	closeOnRowPress: true,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	recalculateHiddenLayout: false,
	previewFirstRow: false,
	directionalDistanceChangeThreshold: 2,
	swipeToOpenPercent: 50,
}
export default List
