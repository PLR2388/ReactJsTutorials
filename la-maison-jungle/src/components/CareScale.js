function CareScale({ scaleValue, careType}) {
    const range = [1, 2, 3];

    const scaleType = careType === 'light' ? '☀️' : '💧'

    return (
        <div>
            {range.map((rangeElm) => scaleValue >= rangeElm ? <span key={rangeElm.toString()}>{scaleType}️</span> : null)}
        </div>
    )
}

export default CareScale