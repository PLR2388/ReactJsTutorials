import { plantList } from '../datas/plantList'
import CareScale from "./CareScale";
import '../styles/ShoppingList.css'

function ShoppingList() {
    const categories = plantList.reduce((acc, plant) =>
        acc.includes(plant.category) ? acc : acc.concat(plant.category)
        , []);

    return (
        <di>
            <ul>
                {categories.map((cat) => (
                    <li key={cat}>{cat}</li>
                ))}
            </ul>
            <ul className='lmj-plant-list'>
                {plantList.map((plant) => (
                    <li key={plant.id} className='lmj-plant-item'>
                        {plant.isBestSale && <span>🔥</span>}
                        {plant.name}
                        <CareScale careType='water' scaleValue={plant.water}/>
                        <CareScale careType='light' scaleValue={plant.light}/>
                       </li>// && enable to display the text if and only if plant.isBestSale=true
                ))}
            </ul>
        </di>
    )
}

export default ShoppingList