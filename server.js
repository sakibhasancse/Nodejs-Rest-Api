import app from './app'
import { dbconnect } from './config/bd';

const port = process.env.PORT || 3000


app.listen(port, host, () => {
    console.log(`server running @ http://${host ? host : 'localhost'}:${port}`);


    dbconnect(process.env.DB_URL)
})