import '../styles/StockCard.css'

export function StockCard({
    ticker, 
    shares,
}:{
    ticker: string,
    shares: number,
}){
    //temp
    const name: string = "Topicus.com"
    const pps: number = 999;
    const totalValue: number = pps * shares;
    const totalSpent: number = 888;
    const gainLoss: number = totalValue - totalSpent;

    return(
        <div className='stock'>
            <div>
                <h4>{ticker}</h4>
                <h5>{name}</h5>
            </div>
            <div>
                <p>No. Shares: {shares}</p>
                <p>Price per Share: ${pps}</p>
                <p>All-time Earnings: <span className={gainLoss > 0 ? 'gain' : 'loss'}>${gainLoss}</span></p>
            </div>
        </div>
    )
}