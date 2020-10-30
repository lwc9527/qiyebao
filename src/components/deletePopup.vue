
<!-- 弹窗组件 -->
<template>
	<div class="delete-wrapper" id='wrapper' >
		<div class="delete_center">
			<div class="deleteInfo">
				{{deleteTips}}
			</div>
			<div class="btn">
				<el-button  @click.stop="cancelBtn">取消</el-button>
				<el-button  @click.stop="deleteBtn">确定</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {

			}
		},
		methods: {
			cancelBtn(){ // 取消
				this.$emit("cancelBtn")
			},
			deleteBtn(){ // 确定删除
				this.$emit("deleteBtn")
			}
		},
		props: ['deleteTips']
	}
</script>
<style lang="scss" scoped>
	.delete-wrapper{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100000;
        display: block;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        background-color:rgba(0,0,0,.3);
        outline: 0;
		.delete_center{
			width: 400px;
			height: 150px;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background: #fff;
			border-radius: 8px;
			z-index: 9999;
			font-size: 14px;
			.deleteInfo{
				color: #606266;
				height: 91px;
				line-height: 99px;
				text-align: center;
				padding: 0 20px;
			}
			.btn{
				display: flex;
				justify-content: center;
				.auxiliaryBtn{
					margin-left: 25px;
				}
			}
		}
	}
	@keyframes fade-in {  
        0% {opacity: 0;}/*初始状态 透明度为0*/  
        40% {opacity: 0;}/*过渡状态 透明度为0*/  
        100% {opacity: 1;}/*结束状态 透明度为1*/  
	}  
	@-webkit-keyframes fade-in {/*针对webkit内核*/  
        0% {opacity: 0;}  
        40% {opacity: 0;}  
        100% {opacity: 1;}  
	}  

	#wrapper {    
        // animation: fade-in;/*动画名称*/  
        animation: fade-in;/*动画名称*/  
        animation-duration: .25s;/*动画持续时间*/  
        -webkit-animation:fade-in .25s;/*针对webkit内核*/  
	}  
</style>