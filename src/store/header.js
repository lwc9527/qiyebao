const header = {
  state: {
    activeKey: "home",
    tabList: [{
      title: '首页',
      key: 'home',
    }, ],
    // cachedViews: ["myAgentTotal"],
    // contentSpinning: false,
    // myAgent: {
    // 	tempId: "0",
    // 	tempNodeId: 0,
    // 	orgId: null,
    // 	expandedKeys: []
    // }
  },
  mutations: {
    SET_TAB_LIST: (state, tabList) => {
      state.tabList = tabList
    },
    SET_TAB_ACTIVE_KEY: (state, activeKey) => {
      state.activeKey = activeKey
    },
    // AFTER_CIRCULATE_TAB: (state, Vue) => {
    // 	const targetKey = Vue.$route.name
    // 	let activeKey = state.activeKey
    // 	let lastIndex
    // 	state.tabList.forEach((pane, i) => {
    // 		if(pane.key === targetKey) {
    // 			lastIndex = i - 1
    // 		}
    // 	})
    // 	const tabList = state.tabList.filter(pane => pane.key !== targetKey)
    // 	if(lastIndex >= 0 && activeKey === targetKey) {
    // 		activeKey = tabList[lastIndex].key
    // 	}
    // 	header.mutations.SET_TAB_LIST(state, targetKey)
    // 	header.mutations.SET_TAB_LIST(state, tabList)
    // 	header.mutations.SET_TAB_ACTIVE_KEY(state,activeKey)

    // 	var query
    // 	tabList.forEach((pane, i) => {
    // 		if(pane.key === activeKey) {
    // 			query = pane.query
    // 		}
    // 	})
    // 	var obj = {}
    // 	if(activeKey.indexOf("/") === -1) {
    // 		obj = {
    // 			name: activeKey,
    // 			query: query ? query : null
    // 		}
    // 	} else {
    // 		obj = {
    // 			path: activeKey,
    // 			query: query ? query : null
    // 		}
    // 	}
    // 	Vue.$router.push(obj)
    // },
    ADD_TAB: (state, tab) => {
      //state.tabList.push(tab);
      //console.log(tab)
      let flag = true
      const cachedViewsWhite = ["myAgentIndex"]

      function getName(strValue) { //获取到对应的name
        if (strValue.indexOf("?") !== -1 || strValue.indexOf("/") !== -1) {
          var str = strValue.split("?")[0]
          var index = str.lastIndexOf("\/");
          str = str.slice(index + 1);
          return str;
        } else {
          return strValue
        }
      }
      let tabKey = tab.key
      let tabIndex = 0
      for (let [index, elem] of state.tabList.entries()) {
        if (elem.key === tabKey) {
          flag = false
          tabIndex = index
          break
        }
      }

      if (cachedViewsWhite.indexOf(tabKey) !== -1) {
        if (flag) {
          state.tabList.push(tab);
        } else {
          state.tabList.splice(tabIndex, 1, tab)
        }
        state.activeKey = tab.key;
        return
      }

      if (flag) {
        // if(state.cachedViews.indexOf(tabKey) === -1) {
        // 	state.cachedViews.push(tabKey)
        // } else {
        // 	state.cachedViews.splice(state.cachedViews.indexOf(tabKey), 1)
        // 	setTimeout(() => {
        // 		state.cachedViews.push(tabKey)
        // 	}, 800)
        // }
        state.tabList.push(tab);
      } else {
        //state.cachedViews.splice(state.cachedViews.indexOf(tabKey), 1)
        state.tabList.splice(tabIndex, 1, tab)
        // setTimeout(() => {
        // 	state.cachedViews.push(tabKey)
        // }, 800)
      }
      state.activeKey = tab.key;
    },
    // REMOVE_CACHED: (state, name) => {
    // 	if(name.indexOf("?") !== -1 || name.indexOf("/") !== -1) {
    // 		function getName(strValue) {
    // 			var str = strValue.split("?")[0]
    // 			var index = str.lastIndexOf("\/");
    // 			str = str.slice(index + 1);
    // 			return str;
    // 		}
    // 		name = getName(name)
    // 	}
    // 	const cachedViews = state.cachedViews.filter(key => key !== name)
    // 	state.cachedViews = cachedViews
    // },
    // CONTENT_SPINNING: (state, bool) => { // this.$store.commit('CONTENT_SPINNING', true)
    // 	state.contentSpinning = bool
    // },
    // SET_MYAGENT: (state, obj) => {
    // 	state.myAgent = obj
    // }
  },
  actions: {

  }
}

export default header