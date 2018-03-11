import React,{Component} from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import RNAccordion from 'react-native-collapsible/Accordion';
import variables from "../../utils/platform";
import Icon from "../../Components/Icon";
import IconfontConf from '../../utils/iconfontConf'
class AccordionPanel extends Component{
  render() {
    return null;
  }
}
class Accordion extends Component{

    renderHeader = (section, _, isActive) => {
        const {headerStyle,activeText } = this.props;
    return (
      <View style={[headerStyle?headerStyle:styles.header, section.style]}>
        {
          React.isValidElement(section.title) ? section.title : (
            <View style={styles.headerWrap}>
              <Text style={styles.headerText}>{section.title}</Text>
            </View>
          )
        }
        <View style={styles.arrow}>
            {activeText&&<Text>{isActive?activeText[0]:activeText[1]}</Text>}
            <Icon type={isActive?'xs':'xiangxia'} color="#bebebe" size="xxs"/>

        </View>
      </View>
    );
  }

  renderContent = (section) => {
    return React.isValidElement(section.content) ? section.content : (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  }
  onChange = (idx) => {
    const { onChange, children } = this.props;
    let key;
    React.Children.map(children, (child, index) => {
      if (idx === index) {
        key = child.key || `${index}`;
      }
    });
    if (onChange) {
      onChange(key);
    }
  }
    render(){
        const { children, style, defaultActiveKey, activeKey } = this.props;

    let defaultActiveSection;
    let activeSection;
    const headers = React.Children.map(children, (child, index) => {
      const key = child.key || `${index}`;
      if (key === defaultActiveKey) {
        defaultActiveSection = index;
      }
      if (key === activeKey) {
        activeSection = index;
      }
      return {
        title: child.props.header,
        content: child.props.children,
        style: child.props.style || {},
      };
    });
        return(
            <View style={[style,styles.container,style]}>
                <RNAccordion
                  initiallyActiveSection={defaultActiveSection}
                  activeSection={activeSection}
                  underlayColor="transparent"
                  sections={headers}
                  renderHeader={this.renderHeader}
                  renderContent={this.renderContent}
                  duration={0}
                  onChange={this.onChange}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    borderTopColor: variables.listBorderColor,
    borderBottomColor:variables.listBorderColor
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: variables.h_spacing_lg,
    borderBottomWidth: variables.borderWidth,
    borderBottomColor: variables.listBorderColor,
    backgroundColor:variables.listBg
  },
  arrow: {
    flex:1,
    flexDirection: 'row',
    justifyContent:"flex-end",
    alignItems:"center",
  },
  icon:{
      fontFamily:'iconfont',
      color:variables.iconGray,
      fontSize:18,
      marginLeft:5,
  },
  headerWrap: {
    flex: 1,
    height: variables.list_item_height,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: variables.textColor,
    fontSize: variables.font_size_subhead,
  },
  content: {
    paddingVertical: variables.v_spacing_md,
    paddingHorizontal: variables.h_spacing_md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: variables.listBorderColor,
    backgroundColor:variables.listBg
  },
  contentText: {
    fontSize: variables.font_size_base,
    color: variables.color_text_caption,

  },


});
Accordion.Panel = AccordionPanel;

export default Accordion;
