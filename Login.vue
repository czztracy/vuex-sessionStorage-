<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
	    <h3 class="title">ZMDZ</h3>
	    <el-form-item prop="account">
	      <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
	    </el-form-item>
	    <el-form-item prop="checkPass">
	      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
	    </el-form-item>
	    <el-form-item style="width:100%;padding-top:5%; text-align: center;">
	      <el-button type="primary" style="width:30%;" @click="login" :loading="logined">登录</el-button>
	      <el-button type="primary" style="width:30%;" @click="register" :loading="isRegister">注册</el-button>
	      <el-button type="primary" style="width:30%;" @click="loginOut" :loading="isLoginout">注销</el-button>
	    </el-form-item>
  	</el-form>
</template>

<script>
	export default {
	  	data(){
	  		return {
	  			isRegister: false,
		    	isLoginout: false,
		        ruleForm: {
		          account: '',
		          checkPass: ''
		        },
		        rules: {
		          account: [
		            { required: true, message: '请输入账号', trigger: 'blur' },
		          ],
		          checkPass: [
		            { required: true, message: '请输入密码', trigger: 'blur' },
		          ]
		        },
		        checked: true
		  	}
	  	},
	 	components:{ },
	 	computed: {
	 		//登录状态
	 		logined() {
	 			return this.$store.state.logined;
	 		}
	 	},
	  	methods:{
		    login() {
		    	console.log("登录");
		    	this.toLogin();
		    },
		    register() {
		    	console.log("注册");
		    	this.toRegister();
		    },
		    toLogin() {
		  		if(sessionStorage.user){
		  			if( this.ruleForm.account == JSON.parse(sessionStorage.user).account && this.ruleForm.passWord == JSON.parse(sessionStorage.user).checkPass){
		  				this.$store.dispatch("login");
		  				setTimeout( () => {
		  					this.$router.push({
			  					path: '/'
			  				})
		  					this.$message({
					          message: '登陆成功',
					          type: 'success'
					       });
		  				}, 3000 )
		  			} else {
			  			this.$message.error('用户名密码错误');
			  		}
		  		} else {
		  			this.$message({
			          message: '用户名密码不存在',
			          type: 'warning'
			        });
		  		}
		  	},
		  	toRegister() {
		  		localStorage.removeItem("user");
		  		//注册信息
		  		let register = {
		  			account: this.ruleForm.account,
		  			passWord: this.ruleForm.checkPass
		  		}
		  		this.isRegister = true;
		  		setTimeout( () => {
		  			sessionStorage.setItem("user", JSON.stringify(register));
		  			
		  			this.$message({
			          message: '注册成功',
			          type: 'success'
			        });
			        this.isRegister = false;
			        console.log(sessionStorage.user)
		  		}, 3000 )
		  		
		  	},
		  	loginOut() {
		  		this.isLoginout = true;
		  		setTimeout( () => {
		  			sessionStorage.removeItem("user");
		  			console.log(sessionStorage.user)
		  			this.$store.dispatch('loginOut')
		  			this.isLoginout = false;
		  		}, 3000 )
		  		
		  	}
		}
	}
</script>

<style scoped lang="scss">
	.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
	    .title {
	      margin: 0px auto 40px auto;
	      text-align: center;
	      color: #505458;
	    }
	    .remember {
	      margin: 0px 0px 35px 0px;
	    }
  	}
</style>
