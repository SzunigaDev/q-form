<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md mid-size q-my-md">
      <q-form @submit="onSubmit">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              dense
              v-model="currentJob"
              label="Trabajo actual"
              type="textarea"
              hint="Si no, coméntanos tu último trabajo y el motivo por el cual ya no estás laborando con ellos"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              dense
              v-model="salaryAspiration"
              label="Aspiración salarial"
              type="number"
              hint="Especifica un valor aproximado"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              dense
              v-model="salaryRange"
              label="Rango salarial"
              type="text"
              hint="Por ejemplo: $30,000 - $40,000"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12">
            <q-input
              dense
              v-model="currentStudies"
              label="Estudios actuales"
              type="textarea"
              hint="Especifica si estás estudiando, en qué semestre y en qué escuela"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-select
              dense
              v-model="ownVehicle"
              :options="['Sí', 'No']"
              label="Vehículo propio"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              dense
              v-model="livingArea"
              label="Área de residencia"
              type="text"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-select
              dense
              v-model="hasVisa"
              :options="['Sí', 'No']"
              label="Visa estadounidense"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-select
              dense
              v-model="documentsInOrder"
              :options="['Sí', 'No']"
              label="Documentos en regla"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-select
              dense
              v-model="dependents"
              :options="['Sí', 'No']"
              label="Dependientes económicos"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6">
            <q-select
              dense
              v-model="maritalStatus"
              :options="['Soltero', 'Casado', 'Divorciado', 'Viudo']"
              label="Estado civil"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12">
            <q-select
              dense
              v-model="availability"
              :options="['Sí', 'No']"
              label="Disponibilidad inmediata"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12">
            <q-input
              dense
              v-model="workExpectations"
              label="Expectativas laborales"
              type="textarea"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12">
            <q-input
              dense
              v-model="strengths"
              label="Fortalezas"
              type="textarea"
              :rules="[val => !!val || 'Campo requerido']"
              lazy-rules
            />
          </div>

          <div class="col-12 q-mt-md">
            <q-btn label="Enviar" type="submit" color="primary" />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { db, auth } from '/src/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

// Instancia de Quasar para notificaciones
const $q = useQuasar()

// Definir referencias para los valores de cada campo del formulario
const currentJob = ref('')
const salaryAspiration = ref('')
const salaryRange = ref('')
const currentStudies = ref('')
const ownVehicle = ref('')
const livingArea = ref('')
const hasVisa = ref('')
const documentsInOrder = ref('')
const dependents = ref('')
const maritalStatus = ref('')
const availability = ref('')
const workExpectations = ref('')
const strengths = ref('')

// Función para manejar el envío del formulario
const onSubmit = async () => {
  try {
    const user = auth.currentUser // Obtén el usuario autenticado actual

    if (!user) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.')
    }

    // Añadir un nuevo documento a la colección 'personalInformation' con referencia al usuario
    await addDoc(collection(db, 'personalInformation'), {
      userId: user.uid,
      currentJob: currentJob.value,
      salaryAspiration: salaryAspiration.value,
      salaryRange: salaryRange.value,
      currentStudies: currentStudies.value,
      ownVehicle: ownVehicle.value,
      livingArea: livingArea.value,
      hasVisa: hasVisa.value,
      documentsInOrder: documentsInOrder.value,
      dependents: dependents.value,
      maritalStatus: maritalStatus.value,
      availability: availability.value,
      workExpectations: workExpectations.value,
      strengths: strengths.value,
      timestamp: new Date() // Marca de tiempo del envío
    })

    // Notificación de éxito
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Formulario enviado correctamente',
    })

    // Limpiar el formulario después de un envío exitoso
    currentJob.value = ''
    salaryAspiration.value = ''
    salaryRange.value = ''
    currentStudies.value = ''
    ownVehicle.value = ''
    livingArea.value = ''
    hasVisa.value = ''
    documentsInOrder.value = ''
    dependents.value = ''
    maritalStatus.value = ''
    availability.value = ''
    workExpectations.value = ''
    strengths.value = ''

  } catch (e) {
    console.error('Error al enviar el formulario: ', e)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: `Error al enviar el formulario: ${e.message}`,
    })
  }
}
</script>

<style lang="scss" scoped>
.mid-size{
  width: 50%
}
</style>

