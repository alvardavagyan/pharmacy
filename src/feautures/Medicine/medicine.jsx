import { useDispatch, useSelector } from "react-redux"
import './medicine.module.css'
import { changeRating, medicineData, setSearchMedicine } from "./medicine.slice"
import { useEffect } from "react"
import axios from 'axios'

export const Medicine = () => {
    const medicines = useSelector(state => state.medicines)
    const searchMedicine = useSelector(state => state.searchMedicine)
    const dispatch = useDispatch()


    const getMedicineData = async () => {
        const res = await axios.get("http://localhost:3004/medicines")
        dispatch(medicineData(res.data))
    }

    const handleRatingChange = async (id, newRating) => {
        dispatch(changeRating({ id, rating: newRating }))
        await axios.patch(`http://localhost:3004/medicines ${id}`, { rating, newRating })
    }

    const handleSearchChange = (e) => {
        dispatch(setSearchMedicine(e.target.value))
    }

    useEffect(() => {
        getMedicineData()
    }, [])

    const filteredMedicine = medicines.filter(med =>
        med.name.trim().includes(searchMedicine.trim())
    )

    return <>
        <h2>JS Pharm</h2>
        <p>Medicine List</p>
        <div>
            <div>
                <div className="Card">
                    <div className="CardInner">
                        <label>Search</label>
                        <div className="container">
                            <div className="InputContainer">
                                <input
                                    placeholder="Find medicine you want..."
                                    value={searchMedicine}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "40px" }} >
                    {filteredMedicine.map((elm) => (
                        <div key={elm.id}>
                            <img src={elm.photo} alt={elm.name} width={100} height={100} />
                            <p>title: {elm.name}</p>
                            <p>price: {elm.price} AMD</p>
                            <div>
                                {
                                    new Array(5)
                                        .fill(null)
                                        .map((_, i) =>
                                            <img key={i} onClick={() => handleRatingChange(elm.id, i + 1)}
                                                src={i < elm.rating
                                                    ? "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png"
                                                    : "https://cdn3.iconfinder.com/data/icons/teenyicons-outline-vol-3/15/star-small-64.png"}
                                                width={20} height={20} />)
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}