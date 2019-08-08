<template>
  <div class="introduce">
    <div class="introduce-top">
      <img src="@/assets/bg.png" alt="" />
      <div class="introduce-top-con clear">
          <div class="introduce-top-con-left">
              <img src="@/assets/logo.png" alt="" />
              <h1>倍思全流程教学管理云平台</h1>
              <p>中小学全流程教育教学云平台</p>
              <p>为新高考提供一站式整体解决方案</p>
          </div>
          <div class="introduce-top-con-right">
              <div class="clear">
                  <!-- 打开PC客户端 and 下载PC客户端 -->
                  <!--<a :href=ticketUrl>打开PC客户端</a>-->
                  <a @click="init">打开PC客户端</a>
                  <img src="@/assets/click_erweima.png" class="erweima_button" alt="" @mouseenter="showQrcode"/>
                  <!-- <img src="@/assets/wx_erweima.png" class="erweima_wx" alt=""/> -->
                  <div class="erweima_wx">
                    <img :src="qrcodeImg" alt="">
                    <p>请使用微信扫描二维码登录小程序</p>
                  </div>
              </div>
              <p class="download-client">没有安装？<strong>立即下载</strong></p>
              <p>版本号：2.0.0.0</p>
              <p>支持系统：Win7/Win8/Win10</p>
              <p>更新时间：2019/07/23</p>
          </div>
      </div>
  </div>

	<div id="qrcode"></div>

  <ul class="introduce-center clear">
      <li>
          <img src="@/assets/school_manage.png" alt="" />
          <h2>学校过程管理大师</h2>
          <p>赋能过程管理，提高教学质量</p>
      </li>
      <li>
          <img src="@/assets/role.png" alt="" />
          <h2>角色化工作界面易学好用</h2>
          <p>角色化与场景化的工作界面，提高管理效率</p>
      </li>
      <li>
          <img src="@/assets/big_data.png" alt="" />
          <h2>教育大数据和AI智能 </h2>
          <p>积累教育大数据，人工智能助力学校教学管理</p>
      </li>
      <li>
          <img src="@/assets/platform.png" alt="" />
          <h2>开放的SAAS平台</h2>
          <p>安全性高，学校使用放心，不用再增加硬件投</p>
      </li>
  </ul>
  <div class="introduce-right-botton">
      <span class="net-button" @click="toNet">
          <img src="@/assets/net.png" alt="" />
          <var>官网</var>
      </span>
      <span class="gongzhonghao-button">
          <img src="@/assets/gongzhonghao.png" alt="" />
          <var>公众号</var>
      </span>
      <img src="@/assets/gongzhonghao_erweima.png" class="gongzhonghao-erweima" alt="" />
  </div>
  <footer>Copyright ©深圳市倍思教育科技有限公司   备案号：粤ICP备18074306号-2 </footer>
  </div>
</template>
<script>
import qrcodeMixin from './qrcodeMixin'

export default {
	name: 'introduce_pc',
	mixins: [qrcodeMixin],
  data() {
    return {
      ticketUrl:null,
    }
  },
  created() {
	  // this.init()
  },
  methods: {
	  init(){
	    let userId=this.$store.state.userId.userId;
	    if(userId&&userId.length){
        // this.ticketUrl=`baseOnline://?userId=${this.$store.state.userId.userId}`
        window.location.href=`baseOnline://?userId=${this.$store.state.userId.userId}`
      }else{
        this.ticketUrl='#'
	      alert('异常')
      }
    },
    // 跳转到官网
    toNet() {
      window.open('https://www.51basejy.com/')
    },
    showQrcode() {
      this.reqQrcode()
    },
  }
}
</script>
<style lang="less" scoped>
.introduce {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 900px;
  margin: 0 auto;
  .introduce-top {
    height: 60%;
    > img {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 1200px;
    }
    .introduce-top-con {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 1200px;
      margin: 0 auto;
      .introduce-top-con-left {
        float: left;
        padding-top: 8%;
        h1 {
          margin-top: 2%;
          margin-bottom: 5.5%;
          font-size: 46px;
          font-weight: bold;
          color: white;
        }
        p {
          margin-bottom: 2.5%;
          font-size: 26px;
          color: white;
        }
      }
      .introduce-top-con-right {
        float: right;
        width: 380px;
        height: 284px;
        margin-top: 12%;
        padding-top: 40px;
        padding-left: 56px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, .15);
        border-radius: 6px;
        > div {
          position: relative;
          margin-bottom: 10px;
          a, span {
            float: left;
            width: 207px;
            height: 58px;
            margin-right: 8px;
            background-image: linear-gradient(-180deg, #60F4FA 0%, #109DA7 100%);
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.20);
            border-radius: 4px;
            font-size: 20px;
            color: white;
            text-align: center;
            line-height: 58px;
            cursor: pointer;
          }
          .erweima_button {
            float: left;
            margin-top: 2px;
            cursor: pointer;
            &:hover {
              + .erweima_wx {
                display: block;
              }
            }
          }
          .erweima_wx {
            display: none;
            position: absolute;
            top: 58px;
            left: 215px;
						width: 260px;
            padding-top: 30px;
            background: url('../../assets/wx_erweima_bg.png') center center no-repeat;
            background-size: contain;
            img {
              display: block;
              width: 196px;
              height: 196px;
              margin: 0 auto 6px;
            }
            p {
              font-size: 16px;
              color: #9B9B9B;
              text-align: center;
            }
          }
        }
        .download-client {
          margin-bottom: 30px;
          color: white;
          font-size: 16px;
          strong {
            font-weight: normal;
            color: #48D5DF;
            cursor: pointer;
          }
        }
        p {
          margin-bottom: 12px;
          font-size: 18px;
          color: white;
        }
      }
    }
  }
  .introduce-center {
    width: 1200px;
    margin: 60px auto;
    li {
      float: left;
      width: 23%;
      margin-right: 2%;
      img {
        display: block;
        margin: 0 auto;
      }
      h2 {
        margin-top: 30px;
        margin-bottom: 22px;
        font-size: 22px;
        color: #333333;
        text-align: center;
      }
      p {
        font-size: 18px;
        color: #999999;
        line-height: 23px;
      }
    }
  }
  .introduce-right-botton {
    position: fixed;
    right: 0;
    bottom: 204px;
    width: 67px;
    background: #22B5C0;
    span {
      display: block;
      width: 48px;
      margin: 0 auto;
      padding-bottom: 10px;
      cursor: pointer;
      &:first-child {
        border-bottom: 1px solid #fff;
      }
      &.gongzhonghao-button:hover {
        + .gongzhonghao-erweima {
          display: block;
        }
      }
      img {
        display: block;
        width: 100%;
      }
      var {
        display: block;
        font-size: 14px;
        color: white;
        text-align: center;
      }
    }
    .gongzhonghao-erweima {
      display: none;
      position: fixed;
      bottom: 106px;
      right: 63px;
    }
  }
  footer {
    height: 60px;
    background: #1B858E;
    font-size: 16px;
    color: #ccc;
    text-align: center;
    line-height: 60px;
  }
}
</style>


