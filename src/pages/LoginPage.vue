<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        type="email"
        v-model="email"
        label="Correo electrónico *"
        hint="example@mail.com"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        type="password"
        v-model="password"
        label="Contraseña *"
        lazy-rules
      />

      <div>
        <q-btn label="Entrar" type="submit" color="primary"/>
        <q-btn label="Restablecer" type="reset" color="primary" flat class="q-ml-sm" />
      </div>

      <!-- Aquí se agrega el enlace a la página de registro -->
      <div class="q-mt-md">
        <q-btn
          label="¿No tienes una cuenta? Regístrate"
          color="secondary"
          flat
          @click="goToRegister"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar';

const $q = useQuasar();
const email = ref("");
const password = ref("");
const router = useRouter();

const onSubmit = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Inicio de sesión exitoso'
    });
    router.push("/");
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: `Error en el inicio de sesión: ${error.message}`
    });
    console.error("Error en el inicio de sesión:", error.message);
  }
};

const onReset = () => {
  email.value = "";
  password.value = "";
  $q.notify({
    color: 'blue-5',
    textColor: 'white',
    icon: 'info',
    message: 'Formulario restablecido'
  });
};

// Función para redirigir a la página de registro
const goToRegister = () => {
  router.push("/register");
};
</script>
