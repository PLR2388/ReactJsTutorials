import CareScale from "./CareScale";
import '../styles/PlantItem.css'

function PlantItem({name, cover, id, light, water, isBestSale}) {
    return <li key={id} className='lmj-plant-item'>
        <img src={cover} className='lmj-plant-item-cover' alt={`${name} cover`}/>
        {name} {isBestSale && <span>🔥</span>}
        <div>
            <CareScale careType='water' scaleValue={water}/>
            <CareScale careType='light' scaleValue={light}/>
        </div>
    </li>// && enable to display the text if and only if plant.isBestSale=true
}

export default PlantItem