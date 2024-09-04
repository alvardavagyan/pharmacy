import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    medicines: [],
    searchMedicine: ''
}
const MedicineSlice = createSlice({
    name: 'medicines',
    initialState,
    reducers: {
        medicineData(state, action) {
            state.medicines = action.payload
        },
        changeRating(state, action) {
            const { id, rating } = action.payload
            let medicine = state.medicines.find(med => med.id == id)
            if (medicine) {
                medicine.rating = rating
            }
        },
        setSearchMedicine(state, action) {
            state.searchMedicine = action.payload
        }
    }
})
export const medicneReducer = MedicineSlice.reducer
export const { medicineData, changeRating, setSearchMedicine } = MedicineSlice.actions
