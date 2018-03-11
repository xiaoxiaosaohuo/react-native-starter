import React ,{PureComponent} from "react";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import Radio from "../Radio";
import Icon from "../Icon";
class Content extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            activeValue:props.activeValue||{},
            activeLeftValue:props.options[0].value||'',
            activeRightValue:"",
            options: props.options||[]
        }

    }
    onSelectLeft = (item,i)=>{
        this.setState({
            activeLeftValue:item.value
        })
    }
    getActive = (values)=>{
        const activeValue  =values||this.state.activeValue;
        let active=[[],{}];
        const keys = Object.keys(activeValue);
        active[0]=keys;
        keys.map(key=>{
            active[1][key]=activeValue[key]
        })
        return active

    }
    onSelectRight = (parentValue,childValue,checked)=>{

            this.setState(prevState=>{
                const activeValue = Object.assign({},prevState.activeValue);
                //排他性选择,每此选择，过滤掉以前选中的
                delete activeValue[parentValue];

                // result.push(...filtered)
                if(checked){
                     activeValue[parentValue]=childValue
                }
                if(this.props.onChange){
                    const active =  this.getActive(activeValue)
                    // console.log(active);
                    this.props.onChange(active[1])
                }
                return{
                    activeValue:activeValue
                }
            })

    }
    render(){
        const {left,right} = this.props;
        const {options,activeValue,activeLeftValue,activeRightValue} = this.state;
        const active =  this.getActive()
        const activeLeft =active[0];
        const activeRight =active[1];
        return(
            <View style={styles.container}>
                <View style={{width:120}}>
                    <ScrollView  >
                        {options.map((item,i)=>{
                            return <TouchableOpacity key={i} onPress={()=>this.onSelectLeft(item,i)} >
                                <View style={[styles.label,activeLeftValue&&activeLeftValue ==item.value?null:{backgroundColor:'#f2f2f2'}]}>
                                    <Text>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
                        })}
                    </ScrollView>
                </View>

                {/*右侧  */}
                <View style={{flex:1}}>
                    <ScrollView >

                    {options.map((select,i)=>{
                        if(select.value==activeLeftValue){
                            return(
                                select.children.map((child,index)=>{
                                    return <Radio
                                            checked={activeRight[select.value]==child.value}
                                            label={child.label}
                                            value={child.value}
                                            size="md"
                                            onChange = {({checked})=>this.onSelectRight(select.value,child.value,checked)}
                                            ></Radio>
                                })
                            )
                        }
                    })}

                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5F5',
        flexDirection:'row',
    },
    label:{
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'center',
        marginBottom:1,
        paddingLeft:20,
        height:40,
    },


})
export default Content
