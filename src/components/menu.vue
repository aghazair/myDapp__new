<template>
    
    <div>
        <button class="btn btn-indigo outline" @click="bignner">Beginner</button>
         <button class="btn btn-indigo outline" @click="professional">Professional</button>
         <button class="btn btn-indigo outline" @click="expert">Expert</button>
    </div>
    
</template>

    


<script>





    export default {
        
        data() {
            return {

            }
        },
         methods: {
        
           bignner(){alert("i am bignner");},
           professional(){alert("i am Professional");},
           expert(){alert("i am Expert");}
         }
    }
</script>

<style>
  h3 {
    margin-bottom: 5%;
  }
</style>
