import { plantList } from '../datas/plantlist'

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
                        {plant.name} {plant.isSpecialOffer  && <div className='lmj-sales'>Soldes</div>}</li>// && enable to display the text if and only if plant.isBestSale=true
                ))}
            </ul>
        </di>
    )
}

export default ShoppingList