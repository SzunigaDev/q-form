<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="src/assets/img/logo.png" alt="Logo de la Aplicación">
          </q-avatar>
          FORMA EJEMPLO
        </q-toolbar-title>

        <!-- Botón de Logout -->
        <q-btn dense flat round icon="logout" @click="logout" class="q-ml-auto" label="Salir" color="white" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <q-list padding>
        <q-item clickable v-ripple @click="goTo('/')" class="text-primary">
          <q-item-section avatar>
            <q-icon name="home" color="primary" />
          </q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/about')" class="text-primary">
          <q-item-section avatar>
            <q-icon name="info" color="primary" />
          </q-item-section>
          <q-item-section>Quiénes Somos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/help')" class="text-primary">
          <q-item-section avatar>
            <q-icon name="help" color="primary" />
          </q-item-section>
          <q-item-section>Ayuda</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/contact')" class="text-primary">
          <q-item-section avatar>
            <q-icon name="contact_mail" color="primary" />
          </q-item-section>
          <q-item-section>Contacto</q-item-section>
        </q-item>

        <!-- Otros menús típicos -->
        <q-separator />

        <q-item clickable v-ripple @click="goTo('/settings')" class="text-primary">
          <q-item-section avatar>
            <q-icon name="settings" color="primary" />
          </q-item-section>
          <q-item-section>Configuración</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/profile')" class="text-primary">
          <q-item-section avatar>
            <q-icon name="person" color="primary" />
          </q-item-section>
          <q-item-section>Perfil</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/notifications')" class="text-primary">
          <q-item-section avatar>
            <q-icon name="notifications" color="primary" />
          </q-item-section>
          <q-item-section>Notificaciones</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useQuasar } from "quasar";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const $q = useQuasar();

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const logout = async () => {
      try {
        await signOut(auth);
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "logout",
          message: "Sesión cerrada correctamente",
        });
        router.push("/login");
      } catch (error) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "error",
          message: `Error al cerrar sesión: ${error.message}`,
        });
        console.error("Error al cerrar sesión:", error.message);
      }
    };

    const goTo = (path) => {
      router.push(path);
      leftDrawerOpen.value = false; // Cierra el drawer al navegar
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      logout,
      goTo,
    };
  },
};
</script>

<style>
.text-primary {
  color: #027be3 !important; /* Color azul primario de Quasar */
}
</style>
