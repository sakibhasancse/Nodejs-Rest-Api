import mongoose from 'mongoose';

// Database Connctions
export const dbconnect = (DB_URL) => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            //don't show the log when it is test
            if (process.env.NODE_ENV !== "test") {
                console.log("Connected to %s", DB_URL);
                console.log("App is running ... \n");
                console.log("Press CTRL + C to stop the process. \n");
            }
        })
        .catch((err) => {
            // if any error in database
            console.error('App starting Error :', err.message);
            process.exit()
        })
    mongoose.connection;
}