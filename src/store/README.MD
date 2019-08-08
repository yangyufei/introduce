# store基本用法
> store分了模块modules。每个模块都加上了命名空间属性:`namespaced: true,`。

## 使用实例

### 在store文件中使用

在store/teachingManagement/courseTeacher.js文件中

```js
export default {
	namespaced: true,
	state: {
		userInfo: {},
	},
	getters: {
		userName (state) {
			return state.userInfo.name
		},
	},
	mutations: {
		updateUserInfo(state, payload) {
			state.userInfo = payload
		},
	},
	actions: {
		setUserInfo({ state, commit }, payload) {
			commit('updatePartnerInfo', payload)
		},
	}
}

```

### 在.vue组件中使用

> 取用模块里面的state, getter, mutation, action，都需要加上模块路径

在page/teachingManagement/courseTeacher.vue组件中

```js
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
	computed: {
		...mapState('teachingManagement/courseTeacher', [
			userInfo,
		]),
		...mapGetters('teachingManagement/courseTeacher', [
			userName,
		]),
	},
	methods: {
		...mapActions('teachingManagement/courseTeacher', [
			setUserInfo,
		]),
		..mapMutations('teachingManagement/courseTeacher', [
			updateUserInfo,
		]),
	},
}
</script>
```

