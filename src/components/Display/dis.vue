<template>
        
<div class="diswindows">
    <div class="win"></div>
    <div class="win"></div>
    <div class="win"></div>
    <div class="win"></div>
</div>

</template>

<script>

export default {
    name: 'DisPwin',
    data() {
        return {
            // Your data properties here
        }
    },
    methods: {
        // Your methods here
    }
}


</script>

<style scoped>
.diswindows{
    display:flex;
    flex-wrap:wrap;
    width:1034px;
    height:1034px;
}

.win{
    margin:10px;
    width:512px;height:512px;
}

</style>