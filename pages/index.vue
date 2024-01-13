<template>
  <div class="absolute flex items-center overflow-y-scroll inset-0 bg-slate-50 py-10">
    <div class="flex  flex-col w-full h-fit justify-center items-center gap-5">
      <div class="text-oxford text-5xl font-bold tracking-wide leading-normal">iSec QR</div>
      <div class="bg-white rounded-lg shadow-md w-[500px] flex  flex-col px-5 py-6">
        <span class="text-oxford text-3xl font-bold tracking-tight leading-normal">iSec QR Код Генератор</span>
        <span class="text-slate-600 mb-5 text-base font-medium tracking-tight leading-normal">Введите адрес и изображение
          эвакуации в формате PDF, чтобы получить для него QR-код.</span>
        <v-form
          ref="QRform"
          @submit="e => onSubmit(e)"
          class="flex form flex-col gap-2"
        >
          <v-file-input
            accept="application/pdf"
            v-model="file"
            color="#FA126C"
            :rules="pdfRules"
            :show-size="1000"
            label="План эвакуации"
            variant="outlined"
          ></v-file-input>
          <v-text-field
            v-model="address"
            variant="outlined"
            prepend-icon="mdi-map-marker-outline"
            :rules="addressRules"
            color="#FA126C"
            label="Адрес здания и этаж"
            placeholder="Пример: г. Астана, Қалдаякова 56, 1 этаж"
          ></v-text-field>
          <div class="flex gap-2 w-full justify-end">
            <v-btn
              type="submit"
              size="large"
              class="w-fit px-5"
              color="#FA126C"
              style="text-transform: none; letter-spacing: .7px;"
              prepend-icon="mdi-qrcode-plus"
            >Сгенерировать QR
              код</v-btn>
            <v-btn
              v-if="!!currentQR"
              @click="() => downloadQR()"
              size="large"
              class="w-fit px-5"
              color="#28B0A6"
              style="text-transform: none; letter-spacing: .7px;"
              prepend-icon="mdi-download"
            >Скачать</v-btn>
          </div>
        </v-form>
        <div
          v-if="!!currentQR"
          class="bg-slate-500 mt-7 mb-4 h-[1px] w-full rounded-full"
        ></div>
        <div
          v-if="!!currentQR"
          class="text-oxford w-full text-center text-3xl font-bold tracking-wide leading-normal mb-2"
        >
          Ваш QR:</div>
        <div class="flex w-full justify-center">
          <div class="image-container max-w-xs max-h-xs">

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';
import { useToast } from '~/hooks/use-toast'
import { qrService } from '~/services/qr.service'

const { toast } = useToast()
const file = ref<File[]>()
const address = ref<string>('')
const QRform = ref(null)
const currentQR = ref<string>('')
const isLoading = ref(false)
const pdfRules = ref([
  (value: File[] | null) => value ? (value.length > 0 || 'Обязательно загрузите файл') : false
])
const addressRules = ref([
  (value: string) => !!value || 'Адрес не должен быть пустым',
  (value: string) => {
    const addressRegex = /^г\.\s[\p{L}\s]+,\s[\p{L}\s]+\s\d+(\/\d+)?,\s\d+\sэтаж$/u;
    return addressRegex.test(value) || 'Формат адреса должен быть таким:\nг. {Город}, {Название адреса} {Номер дома}, {Номер этажа} этаж';
  }
])


const downloadQR = () => {
  const link = document.createElement('a')
  link.setAttribute('href', currentQR.value)
  link.download = 'iSec QR Code' + new Date(Date.now()).toDateString()
  link.click()
}

const onSubmit = async (e: SubmitEventPromise) => {
  e.preventDefault();
  if (await isValid()) {
    isLoading.value = true

    const form = new FormData()
    form.append('address', address.value)
    form.append('file_path', file.value![0])
    const { qr_url } = await qrService.createQR(form)

    const img = document.createElement('img')
    currentQR.value = qr_url
    img.src = currentQR.value
    img.className = 'w-full h-full object-cover mx-auto'

    document.querySelector('.image-container')?.appendChild(img)
    // on success    
    toast.success({ message: 'Загрузили ваш план эвакуации успешно. Вот ваш QR код. ' })
    isLoading.value = false
    resetForm()
  }
}

const isValid = async () => {
  //@ts-expect-error registerForm type gives automaticcaly in vuetify
  const { valid } = await QRform.value?.validate()
  return valid
}

const resetForm = () => {
  //@ts-expect-error registerForm type gives automaticcaly in vuetify
  QRform.value?.reset()
}

</script>

<style></style>