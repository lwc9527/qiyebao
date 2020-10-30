import Vue from "vue";
import router from "@/router";

// function _bodyClickJump(evt) {
//     console.log(evt)
// }

Vue.directive("href", {
  bind: (el, binding) => {
    //console.log(el, binding, vnode)
    const value = binding.value;
    el.addEventListener("click", () => {
      router.push({ path: value });
    });
  }
});
