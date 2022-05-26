import { plantList } from '../datas/plantList'
import '../styles/ShoppingList.css'
import PlantItem from "./PlantItem";

function ShoppingList({children}) {
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
                {plantList.map(({id, cover, name, water, light, isBestSale}) => (
                    <PlantItem isBestSale={isBestSale} id={id} name={name} water={water} light={light} cover={cover}/>
                ))}
            </ul>
        </di>
    )
}

export default ShoppingList