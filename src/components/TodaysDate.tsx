import './TodaysDate.css'

export function TodaysDate(){
    const date: Date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const time = date.toLocaleTimeString();
    
    return (
        <div className="date">
            <p>{formattedDate}</p>
            <p>{time}</p>
        </div>
    )
}

// https://www.tutorialspoint.com/typescript/typescript_date_object.htm