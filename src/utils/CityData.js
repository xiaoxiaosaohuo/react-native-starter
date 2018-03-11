/**
 * Created by choayo on 2016/12/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ListView,
    Image,
    Alert
} from 'react-native';

function CityData(level) {
    let url = `basic/group/area/getAreaByParams`
    fetchData.getData(url, {level:level})
        .then(function (data) {
            return data.data.records
        }, function (err) {
            console.log(err);
        })
};

export default CityData