<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // let ticketVal=window.location.href.split("?")[1].split("=")[1].replace(/\%3D/g,"=")
    let ticketVal = this.GetQueryString('ticket')
    this.getUserId(ticketVal)
  },
  methods: {
    // 获取用户id
    getUserId(id) {
      let params = {
        // ticket: id,
        ticket: 'NlNwNzVlYzE2MjYtMTczOS00YmI4LWFjMTYtMjYxNzM5M2JiODMwMTU2NTE1NjM0NjE5Mg==',
        type: 'EDUYUN'
      }
      this.$ajax.get('/extra/user/getUserId', params).then(res => {
        console.log(res.code)
				if (res.code == 200) {this.$store.commit('GET_USERID', {userId: res.data.userId, userName: res.data.userName})
        } else {
          this.$store.commit('GET_USERID', {userId: '', userName: ''})
        }
      }).finally(() => {
        if (this._isMobile()) {
          // alert("手机端");
          this.$router.replace('/introduce_wap');
        } else {
          // alert("pc端");
          this.$router.replace('/introduce_pc');
        }
      })
    },
    // 判断是否是手机端
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    // 获取地址后面的参数
    GetQueryString(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null){
        return unescape(r[2]);
      }else{
        return null;
      }
    }
	}
}
</script>

<style>

</style>
