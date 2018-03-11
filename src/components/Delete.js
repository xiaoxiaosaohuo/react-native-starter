import React,{Component} from "react";
import Button from "./Button";
import Icon from "./Icon";
import Text from "./Text";
class Delete extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }
    onPress = ()=>{
        this.setState({
            visible:true
        })
    }
    handleDel = ()=>{
        const {onPress,rowData:{item,index},rowMap} = this.props;
        onPress&&onPress(item,index,rowMap)
    }
    componentWillReceiveProps(nextProps){
        const {close} = nextProps;
        if(close&&this.props.close!=close){
            this.setState({
                visible:false
            })
        }
    }
    render(){
        const {visible} = this.state;
        const {disabled=false} = this.props;
        return(
            !visible?(<Button
                type='danger'
                fill="full"
                style={{height:null,flex:1,width:100,alignSelf:"center",borderWidth:0}}
                onPress = {this.onPress}
                disabled={disabled}
                >
                <Icon type="del" color="white" />
            </Button>):(<Button
                type='danger'
                fill="full"
                style={{height:null,flex:1,width:100,alignSelf:"center",borderWidth:0}}
                disabled={disabled}
                onPress = {this.handleDel}
                >
                <Text color="#fff" size={15} style={{flex:1}}>确认删除</Text>
            </Button>)
        )
    }
}

export default Delete;
