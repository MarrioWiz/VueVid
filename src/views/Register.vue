<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const form = ref({ name:'', email:'', password:'' }); 
</script>

<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card border border-success shadow-lg" style="background-color: #1e1e2e; border-color: #00ff00;">
                <div class="card-header text-white" style="background: linear-gradient(90deg, #0f0c29, #302b63, #24243e); font-weight: bold; font-family: 'Press Start 2P', cursive;">
                    REGISTER
                </div>
                <div class="card-body" style="background: linear-gradient(180deg, #1a1a2e, #16213e); border-radius: 0 0 10px 10px; color: #ffffff;">
                    <form @submit.prevent="authStore.register(form)">
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="background-color: #0f0c29; color: #00ff00; border: none;">
                                <i class="fa-solid fa-user"></i>
                            </span>
                            <input type="text" v-model="form.name" placeholder="Name" class="form-control" style="border: 1px solid #00ff00; background-color: #1e1e2e; color: #ffffff;">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="background-color: #0f0c29; color: #00ff00; border: none;">
                                <i class="fa-solid fa-at"></i>
                            </span>
                            <input type="email" v-model="form.email" placeholder="Email" class="form-control" style="border: 1px solid #00ff00; background-color: #1e1e2e; color: #ffffff;">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="background-color: #0f0c29; color: #00ff00; border: none;">
                                <i class="fa-solid fa-key"></i>
                            </span>
                            <input type="password" v-model="form.password" placeholder="Password" class="form-control" style="border: 1px solid #00ff00; background-color: #1e1e2e; color: #ffffff;">
                        </div>
                        <div class="d-grid mx-auto">
                            <button class="btn" style="background: linear-gradient(90deg, #0f0c29, #302b63, #24243e); color: #00ff00; font-weight: bold; font-family: 'Press Start 2P', cursive; border: none;">
                                Send
                            </button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


