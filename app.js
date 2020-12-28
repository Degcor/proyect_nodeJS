// generic imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const categoryRoutes = require("./routes/category");
const directorRoutes = require("./routes/director");

// app - express
const app = express();

// modern connection
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
};

// execute db connection
db();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "Movie API",
            description: "Movie API Information",
            contact: {
                name: "diego_dev"
            },
            servers: ["http://localhost:3000"]
        }
    },
    securityDefinitions:{
        petstore_auth:{
            type: "oauth2",
            authorizationUrl: "http://petstore.swagger.io/oauth/dialog",
            flow: "implicit",
            scopes:{
                write:{
                    pets: "modify pets in your account"
                },
                read:{
                    pets: "read your pets"
                }
            }
        },
        api_key:{
            type: "apiKey",
            name: "api_key",
            in: "header"
        }
    },
    // definition the apis with swagger 
    apis: ['./routes/*.js']
};

// final definitions with swagger-express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* routes middlewares */
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", categoryRoutes);
app.use("/api", directorRoutes);

// port
const port = process.env.PORT || 8000;

// listen port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});