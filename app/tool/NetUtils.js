
import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';

const {width,height} = Dimensions.get('window');

export default class NetUtils extends Component {

    constructor(props){
        super(props);

    }




    /**
     * 普通的get请求
     * @param {*} url 地址
     * @param {*} params  参数
     * @param {*} callback  成功后的回调
     */
    static get(url,params,callback){
        fetch(url,{
            method:'GET',
            body:params
        })
            .then((response) => response.json())
            .then((responseData) => {
                //根据接口规范在此判断是否成功，成功后则回调
                // if(json.resultCode === "SUCCESS"){
                //     callback(json);
                // }else{
                //     //否则不正确，则进行消息提示
                //     alert("请求出错")
                // }
                callback(responseData);

            }).catch(error => {
            alert(error)
        });
    };

    /**
     * post key-value 形式 hader为'Content-Type': 'application/x-www-form-urlencoded'
     * @param {*} url
     * @param {*} service
     * @param {*} params
     * @param {*} callback
     */
    static post(url,params,callback){
        //添加公共参数

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'//key-value形式
            },
            body:params
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
            })
            .then((json) => {
                if(json.resultCode === "SUCCESS"){
                    callback(json);
                }else{
                    alert("请求出错")
                }
            }).catch(error => {
            alert(error);
         //   alert("请求出错")
        });
    };

    /**
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} url
     * @param {*} service
     * @param {*} jsonObj
     * @param {*} callback
     */
    static postJson(url,jsonObj,callback){
        alert(JSON.stringify(jsonObj))

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'sid':'96323b0a-e15d-4443-87a8-c0c071abbc3b',
                'sign':'FF945F4488F2928A5D80E77BBEBB5DE7',
            },
            //
            body:JSON.stringify(jsonObj),//json对象转换为string
        })

            .then((response) => response.json())
            .then((responseData) => {
                //根据接口规范在此判断是否成功，成功后则回调
                // if(json.resultCode === "SUCCESS"){
                //     callback(json);
                // }else{
                //     //否则不正确，则进行消息提示
                //     alert("请求出错")
                // }
                if(responseData.success === "true"){
                    alert("请求成功")

                    callback(responseData);
                }else {
                    alert("请求" +responseData.success + "原因：" +responseData.errorInfo["errorMsg"])

                }
            }).catch(error => {
            alert(error)
        });
    };

    /**
     * 获取当前系统时间 yyyyMMddHHmmss
     */
    static getCurrentDate(){
        var space = "";
        var dates = new Date();
        var years = dates.getFullYear();
        var months = dates.getMonth()+1;
        if(months<10){
            months = "0"+months;
        }

        var days = dates.getDate();
        if(days<10){
            days = "0"+days;
        }

        var hours = dates.getHours();
        if(hours<10){
            hours = "0"+hours;
        }

        var mins =dates.getMinutes();
        if(mins<10){
            mins = "0"+mins;
        }

        var secs = dates.getSeconds();
        if(secs<10){
            secs = "0"+secs;
        }
        var time = years+space+months+space+days+space+hours+space+mins+space+secs;
        return time;
    };

    /**
     * 获取当前系统时间 yyyyMMddHH
     */
    static getCurrentDateFormat(){
        var space = "";
        var dates = new Date();
        var years = dates.getFullYear();
        var months = dates.getMonth()+1;
        if(months<10){
            months = "0"+months;
        }

        var days = dates.getDate();
        if(days<10){
            days = "0"+days;
        }
        var time = years+space+months+space+days;
        return time;
    };
}
