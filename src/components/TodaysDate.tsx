import '../styles/TodaysDate.css'

export function TodaysDate(){
    const date: Date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', {timeStyle: 'short'}).format(date);
    let greeting = "Hello";
    
    if(date.getHours() < 12){
        greeting = "Good Morning!";
    }
    else if(date.getHours() < 19){
        greeting = "Good Afternoon!";
    }
    else if(date.getHours() < 24){
        greeting = "Good Evening!";
    }
    
    return (
        <div className='dateTime'>
            <h1>{greeting}</h1>
            <div className="date">
                <h2>{formattedDate} {formattedTime}</h2>
            </div>
        </div>
    )
}

// https://www.tutorialspoint.com/typescript/typescript_date_object.htm