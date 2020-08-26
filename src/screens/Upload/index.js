import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, Modal, Linking } from 'react-native'
import axios from 'axios'
import { screen, system } from '../../utils/common'

import { Heading2, Heading3, Paragraph } from '../../widget/Text'

// redux & router
import { connect } from 'react-redux';
import Router from '../../Router';
import { LayoutScroll, Touchable, Btn } from '../../componments/index';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import color from '../../widget/color'
import { navigationConfig } from '../../common/navigation';
// 上传
import Upload from 'react-native-background-upload';
//import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
// 图片点击放大
import ImageViewer from 'react-native-image-zoom-viewer';
import { Images } from '../../common/images';
import { ToastShow } from '../../utils/toast';
import RNRestart from 'react-native-restart';
import Spinner from 'react-native-loading-spinner-overlay';

import ImagePicker from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
var isCommit = true;
const commonOptions = {
  url: '',
  path: '',
  method: 'PUT',
  type: 'raw',
  // only supported on Android
  notification: {
    enabled: true,
  },
};

class AlipayScreen extends Component<Props, State>{

  constructor(props: Object) {
    super(props);
    this.TimeOutCount = null;
    this.state = {
      imgList: [],
      modalVisible: false,
      imagesModal: [],
      isCommit: false,

      currentNum: 1,
      total: 0,
      loadingVisible: false,
    }

  }

  componentDidMount() {
    // 当前用户是否已经上传图
    this.InitGetUserImgList()
    // 定时 刷新 
    this.initLoadUpload();
  }


  shouldComponentUpdate(nextProps, nextState) {


    if (isCommit) {
      isCommit = false
      return false
    }
    return true;
  }

  initLoadUpload() {

    if (this.TimeOutCount != null) {
      clearTimeout(this.TimeOutCount);
    }
    this.TimeOutCount = setTimeout(() => {
      const { imgList } = this.props.NSAuthpersonal;
      if (this.props.NSAuthpersonal.selectCreditTypeNo.number > 0) {
        this.setState({
          imgList: imgList
        })
      }
    }, 1000);
  }


  // 当前用户是否已经上传图
  InitGetUserImgList() { 
    if (this.props.NSAuthpersonal.selectCreditTypeNo.number > 0) {
      const { dispatch } = this.props;
      dispatch({
        type: 'SelectCreditListDetail', payload: {
          creditTypeNo: this.props.NSAuthpersonal.selectCreditTypeNo.creditTypeNo,
          clientNo: this.props.NSIndex.clientInfo.clientNo,
        }
      });
      const { imgList } = this.props.NSAuthpersonal;


      this.setState({
        imgList: imgList
      })

    }

  }

  uploadUserinfo2() {
    const { dispatch } = this.props;

    const { creditTypeKey } = this.props.NSAuthpersonal.selectCreditTypeNo;
    console.log('creditTypeKey:' + creditTypeKey)
    ImagePicker.openPicker({
      width: 300, 
      height: 400,
      multiple: true,
    }).then(image => {
      console.log(image)
      if(image.length > 9){
        ToastShow('一次最多只能选9张');
        return
      }
      dispatch({
        type: 'GetOssSign',
        payload: {
          fileType: creditTypeKey,
          fileNumber: image.length,
          suffix: 'jpg',
        },
        callback: (res) => {
          if (res.code == 0) {
            //正在上传 
            this.setState({
              loadingVisible: true,
            });
            if (image.length > 1) {
              image.map((item, index) => {
               
                const { host, accessId, dir, policy, signature, callback} = res.data;
                let fileName = res.data.fileName.replace(/\s/g, "").split(",")

                const data_params = new FormData();
                data_params.append("key", dir + fileName[index]);
                data_params.append("policy", policy);
                data_params.append("OSSAccessKeyId", accessId);
                data_params.append("success_action_status", '200');
                data_params.append("callback", callback);
                data_params.append("Signature", signature);
                // data_params.append("file",fileName);
                data_params.append("file", { uri: item.path, type: "multipart/form-data", name: "image.png" }, fileName[index]);
                /*上传到OSS*/
                axios({
                  url: host,
                  method: 'post',
                  data: data_params,
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(res => {
                  if (res.status === 200) {

                    // 临时展示列表
                    const creditUrlPath = `${host}/${dir}` + fileName[index];
                    let urlPath = {
                      creditUrlPath: creditUrlPath,
                      id: this.getRandom(10000, 99999),
                    }
                    this.setState({
                      imgList: [...this.state.imgList, urlPath]
                    })
                    isCommit = true
                    
                  }
                  if (index + 1 == fileName.length) {
                   
                    this.setState({
                      loadingVisible: false,
                    },()=>{
                      this.submitUpload()
                    })
                  }

                }).catch(e => {
                  Toast.show('图片上传失败');
                })

              })
            } else {
              const { host, accessId, dir, policy, signature, callback, fileName } = res.data;
              const data_params = new FormData();
              data_params.append("key", dir + fileName);
              data_params.append("policy", policy);
              data_params.append("OSSAccessKeyId", accessId);
              data_params.append("success_action_status", '200');
              data_params.append("callback", callback);
              data_params.append("Signature", signature);
              // data_params.append("file",fileName);
              data_params.append("file", { uri: image[0].path, type: "multipart/form-data", name: "image.png" }, fileName);
              /*上传到OSS*/
              axios({
                url: host,
                method: 'post',
                data: data_params,
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(res => {
                if (res.status === 200) {

                  // 临时展示列表
                  const creditUrlPath = `${host}/${dir}` + fileName;
                  let urlPath = {
                    creditUrlPath: creditUrlPath,
                    id: this.getRandom(10000, 99999),
                  }
                  this.setState({
                    imgList: [...this.state.imgList, urlPath]
                  })
                  isCommit = true
                  this.submitUpload()
                }
                this.setState({
                  loadingVisible: false,
                })
              }).catch(e => {
                Toast.show('图片上传失败');
              })
            }
          }

        }
      })

      // let { path } = image[0];
      // let sub_suffix = '';
      // let fileName = ''
      // if (path) {
      //   const i = path.lastIndexOf('/') + 1;
      //   const suffixIndex = path.lastIndexOf('.') + 1;
      //   fileName = path.substring(i);
      //   sub_suffix = path.substring(suffixIndex);

      //   sub_suffix = this.get_suffix(fileName);
      // }

      // const source = {
      //   uri: path,
      //   type: 'application/octet-stream',
      //   name: fileName
      // };
      // // 区分当前是信息认证还是补充材料
      // const { creditTypeKey } = this.props.NSAuthpersonal.selectCreditTypeNo;
      // this.UploadFileOss(sub_suffix, creditTypeKey, source, fileName);





    })
  }


  onSwiperIndexChanged = (index) => {
 
    this.setState({
      currentNum: index + 1
    })
  }

  /*正面上传*/
  uploadUserinfo(type) {
    const options = {
      title: null,
      mediaType: 'photo',
      cameraType: 'back',
      noData: true,
      quality: 1.0,
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseWhichLibraryTitle: '从图库选择',
      chooseFromLibraryButtonTitle: '选择图片',
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: false,
        cameraRoll: true,
        path: '/'
      },
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        //  用户取消选择图片了
      }
      else if (response.error) {
        this.setState({
          visible1: true
        })

        if (response.error.indexOf('Camera permissions not granted') > -1) {
          ToastShow('APP需要使用相册，请打开相册权限允许APP使用');

          if (this.TimeOutCount != null) {
            clearTimeout(this.TimeOutCount);
          }
          this.TimeOutCount = setTimeout(() => {
            Linking.openURL('app-settings://')
          }, 2000);


        }
        if (response.error.indexOf('Photo library permissions not granted') > -1) {
          ToastShow('APP需要使用相册，请打开相册权限允许APP使用');

          if (this.TimeOutCount != null) {
            clearTimeout(this.TimeOutCount);
          }
          this.TimeOutCount = setTimeout(() => {
            Linking.openURL('app-settings://')
          }, 2000);
        }

        //  选图片报错
      } else if (response.customButton) {
        //  自定义按钮
      } else {

        let { fileName, uri } = response;
        let sub_suffix = '';
        if (!fileName) {
          const i = uri.lastIndexOf('/') + 1;
          const suffixIndex = uri.lastIndexOf('.') + 1;
          fileName = uri.substring(i);
          sub_suffix = uri.substring(suffixIndex);
        } else {
          sub_suffix = this.get_suffix(fileName);
        }

        const source = {
          uri: response.uri,
          type: 'application/octet-stream',
          name: fileName
        };
        // 区分当前是信息认证还是补充材料
        const { creditTypeKey } = this.props.NSAuthpersonal.selectCreditTypeNo;

        this.UploadFileOss(sub_suffix, creditTypeKey, source, fileName);
      }
    });
  }

  get_suffix(filename) {
    return (filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)).toLowerCase();
  }

  // 文件上传

  UploadFileOss(sub_suffix, creditTypeKey, source, fileName) {

    /*图片上传*/
    const { dispatch } = this.props;

    dispatch({
      type: 'GetOssSign',
      payload: {
        fileType: creditTypeKey,
        fileNumber: 1,
        suffix: sub_suffix,
      },
      callback: (res) => {

        if (res.code == 0) {
          //正在上传
          Toast.show('正在上传...');
          const { host, accessId, dir, policy, signature, callback, fileName } = res.data;
          const data_params = new FormData();
          data_params.append("key", dir + fileName);
          data_params.append("policy", policy);
          data_params.append("OSSAccessKeyId", accessId);
          data_params.append("success_action_status", '200');
          data_params.append("callback", callback);
          data_params.append("Signature", signature);
          // data_params.append("file",fileName);
          data_params.append("file", source, fileName);


          /*上传到OSS*/
          axios({
            url: host,
            method: 'post',
            data: data_params,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            if (res.status === 200) {

              // 临时展示列表
              const creditUrlPath = `${host}/${dir}` + fileName;
              let urlPath = {
                creditUrlPath: creditUrlPath,
                id: this.getRandom(10000, 99999),
              }
              this.setState({
                imgList: [...this.state.imgList, urlPath]
              })
              isCommit = true
              this.submitUpload()
            } else {
              Toast.hide();
              // 不让页面更新


            }

          }).catch(e => {
            Toast.show('图片上传失败');
          })
        }
      }
    });
  }
  // 图片临时id
  getRandom(n, m) {
    var num = Math.floor(Math.random() * (m - n + 1) + n)
    return num
  }

  // 弹窗修改值

  getItem(index) {
    this.setState({
      modalVisible: true,
      currentNum: index + 1
    })
  }
  // 删除当前数组的数据
  // DeleteImgList(item_list) {
  //   const { dispatch } = this.props;
  //   const { imgList } = this.state;
  //   const { id } = item_list;
  //   const newArr = imgList.filter(obj => obj.id !== id)
  //   this.setState({
  //     imgList: newArr,
  //   })
  // }


  // 删除当前数组的数据
  DeleteImgList = () => {
    const { dispatch } = this.props;
    const newArr = [...this.state.imgList]
    const a = newArr.length   // 因为Swiper组件删除最后一个元素会出现空白，所以这里定义变量以便下面是否要做一次隐藏和显示model的操作
    const b = this.state.currentNum

    const currentNum = newArr.length == this.state.currentNum ? this.state.currentNum - 1 : this.state.currentNum
    newArr.splice(this.state.currentNum - 1, 1)
    if (newArr.length < 1) {
      this.setState({
        modalVisible: false,
      })
    }
    this.setState({
      imgList: newArr,
      total: newArr.length,
      currentNum
    }, () => {
      this.submitUpload()
      if (a == b) {
        this.setState({
          modalVisible: false
        }, () => {
          this.setState({
            modalVisible: true
          })
        })
      } else {

      }
    })


  }


  // 提交当前用户上传的文件，并刷新reducers数据
  submitUpload() {
    const { dispatch } = this.props;
    const { imgList } = this.state;
    const { clientNo } = this.props.NSIndex.clientInfo;
    // 区分提交的TypeNo
    const { creditTypeNo } = this.props.NSAuthpersonal.selectCreditTypeNo;

    // if (imgList.length < 1) {
    //   ToastShow('必须上传图片才能提交');
    //   return false;
    // }

    let arr = []
    // 处理更新后的path路径
    imgList.forEach((item, index) => {
      arr[index] = item.creditUrlPath;
    });

    dispatch({
      type: 'AddCreditListDetail', payload: {
        creditUrlPath: arr,
        creditTypeNo: creditTypeNo,
      },
      callback: (res) => {
        if (res.code == 0) {


          // 更新上一页的数量
          dispatch({ type: 'CreaditAuth', payload: {} });
          // 每次成功后触发 信息认证状态
          //  this.init()
          // Navigation.push(this.props.componentId, { 
          //   component: {
          //     name: Router.AUTHOTHER,
          //     options: {
          //       bottomTabs: {
          //         visible: false,
          //         drawBehind: true,
          //         animate: true,
          //       },
          //     },
          //   },
          // });
        } else {
          Toast.show('upload失败');
        }
      }
    });
  }



  // 初始化认证列表
  init() {
    const { dispatch } = this.props;
    dispatch({
      type: 'InitAuthInfoListState',
      payload: {},
    });
  }



  render() {
    const { imagesModal, imgList } = this.state;
    const oColor = 'rgba(0,0,0,0.45)';
 

    // if(!imgList ){ 
    //   imgList = [0,0];
    // }


    return (
      <LayoutScroll  >
        <Spinner
          visible={this.state.loadingVisible}
          overlayColor={oColor}
          textContent={"正在上传"}
          size={'large'}
          textStyle={{
            color: '#fff',
            fontSize: 14,
          }}
        />
        <View style={styles.headerContaier}>

          <FlatList
            data={imgList || []}
            numColumns={3}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) =>

              <View style={styles.container_box} id={item.id} >
                <Touchable onPress={() => {
                  // 修改当前弹窗状态
                  this.getItem(index)
                }}>
                  <Image style={styles.content_img} source={{ uri: item.creditUrlPath }} />

                </Touchable>

                {/* <Touchable onPress={() => {
                  // 修改当前弹窗状态
                  this.DeleteImgList(item)
                }} style={styles.delete_img}>

                  <Image style={styles.delete_img} source={Images.public.Delete} />

                </Touchable> */}

              </View>
            }
          />

        </View>

        <View style={styles.container_box}  >
          <Touchable onPress={() =>
            this.uploadUserinfo2('alipay')
            // 添加图
          } >
            <Image style={styles.content_img} source={{ uri: 'http://res.jqtianxia.cn/test/add.png' }} />
          </Touchable>
        </View>

        {/* 弹窗图 */}
        {/* <Modal visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer
            enableImageZoom={false}
            onClick={() => {
              this.setState({
                modalVisible: false
              })
            }} imageUrls={imagesModal} />
        </Modal> */}


        <Modal visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onCancel={() => this.setState({ modalVisible: false })}
        >

          <View style={styles.modal_content} >
            <Touchable onPress={() => this.setState({ modalVisible: false })} >
              <View style={styles.model_close}  >
                <Image style={styles.close_img} source={Images.public.close} />
              </View>
            </Touchable>
            <View style={styles.swiper} >
              <Swiper
                index={this.state.currentNum - 1}
                style={styles.swiper}
                showsPagination={false}
                loop={false}
                onIndexChanged={(index) => this.onSwiperIndexChanged(index)}

              >
                {
                  imgList && imgList.length ? imgList.map(item => {

                    return (
                      <View style={styles.slide1}>
                        <Image style={styles.siled_img} source={{ uri: item.creditUrlPath }} />
                      </View>
                    )

                  }):<View></View>
                }

              </Swiper>
            </View>
            <Touchable onPress={this.DeleteImgList} >
              <View style={styles.model_delete_img}  >
                <View style={styles.delete_img_btn} >
                  <Text style={styles.delete_img_text} >
                    {this.state.currentNum}/{imgList.length}
                  </Text>
                  <Image style={styles.delete_img} source={Images.public.Delete2} />

                </View>
              </View>
            </Touchable>

          </View>
        </Modal>


        {/* <Btn style={styles.cardBtn} onPress={() => {
          this.submitUpload();
        }}>提交</Btn> */}
      </LayoutScroll >

    )
  }


}

AlipayScreen.options = navigationConfig('上传');
// 定义样式
const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 188,
  },
  headerContaier: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 28,
  },
  container_box: {
    width: 101,
    height: 100,
    marginLeft: 20,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content_img: {
    width: 80,
    height: 80,
  },
  // delete_img: {
  //   width: 14,
  //   height: 14,
  //   position: 'absolute',
  //   right: 0,
  //   top: 0,
  // },
  delete_img: {
    width: 16,
    height: 16,
    color: 'white'
  },
  cardBtn: {
  },


  modal_content: {
    flex: 300,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardBtn: {
  },

  swiper: {
    height: 300,
    backgroundColor: "#666"
  },
  slide1: {
    width: width,
    backgroundColor: '#999',
    height: "auto"
  },
  slide1_content: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  model_close: {
    marginTop: height / 6,
    height: 40,
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: 'flex-end',
    paddingRight: 10
  },
  model_delete_img: {
    height: 55,
    width: width,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  delete_img_btn: {
    height: 40,
    backgroundColor: '#F64976',
    width: width / 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  close_img: {
    height: 20,
    width: 20,
  },
  delete_img_text: {
    textAlign: 'center',
    color: 'white',
    marginRight: 3
  },
  siled_img: {
    width: width,
    height: 300
  }

})
export default connect(({ NSAuthpersonal, NSIndex, NSBasic }) => ({ NSAuthpersonal, NSIndex, NSBasic }))(AlipayScreen);

