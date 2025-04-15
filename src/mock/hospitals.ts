import { ref } from 'vue'

export interface Hospital {
  label: string
  value: string
}


const hospitals = [
  {
    label: "Spandan Nagpur",
    value: "spandan-nagpur"
  },
  {
    label: "Jupiter Thane",
    value: "jupiter-thane"
  }
]


const selectedHospital = ref(
  // Initialize from localStorage or use first hospital
  JSON.parse(localStorage.getItem('selectedHospital') || 'null') || hospitals[0]
)


export function selectHospital(hospital: Hospital) {
  selectedHospital.value = hospital
  localStorage.setItem('selectedHospital', JSON.stringify(hospital))
}


export { hospitals, selectedHospital }