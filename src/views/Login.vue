<template>
<section class="login-page">
            <form @submit.prevent="checkLogin">
                <input ref="txtUserEmail" type="email" placeholder="Email address" v-model="user.email" />
                <input type="password" placeholder="Password" v-model="user.password"/>
                <button type="submit" :disabled="!this.user.email || !this.user.password">Log in</button>
            </form>

        </section>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {
      user: { email: "Amit@gmail.com", password: "12345" }
    }
  },

  created() {

  },

  methods: {
        checkLogin() {
            this.$store.dispatch({type: 'login', userCredentials:this.user})
            .then(res => {
                console.log('You have been logged-in!')
                EventBusService.$emit(SHOW_MSG, {txt: `Welcome ${this.user.name}`});
                this.$router.push('/chat');
            })
            .catch(err => {
                console.log('Login Failed!');
                EventBusService.$emit(SHOW_MSG, {txt: `Wrong Credentials, please try again`, type: 'danger'});
                this.$refs.txtUserEmail.focus();
            })
        }
    },
    computed: {
    }

};
</script>

<style>

</style>
