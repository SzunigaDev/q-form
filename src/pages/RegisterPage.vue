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
        :rules="[ val => val && val.length > 0 || 'Por favor, escribe algo']"
      />

      <q-input
        type="password"
        v-model="password"
        label="Contraseña *"
        lazy-rules
      />

      <div>
        <q-btn label="Registrarse" type="submit" color="primary"/>
      </div>

    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar';

const $q = useQuasar();
const email = ref("");
const password = ref("");
const router = useRouter();

const onSubmit = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Registro exitoso'
    });
    router.push("/");
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: `Error en el registro: ${error.message}`
    });
    console.error("Error en el registro:", error.message);
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


</script>
