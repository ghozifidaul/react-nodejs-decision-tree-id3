// INITIAL LIBS
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const DecisionTree = require('decision-tree'); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let train = [];
let test = [];
let nama_kelas = "";
let features_server = [];

let accuracy = "";
//let predicted_class = "";
let tree_model = [];
let predicted_class = {
    color: null,
    shape: null
};

//API POST VARIABLE DECISION TREE
app.post('/input_data', (req, res) => {
    const { training_data, test_data, class_name, features } = req.body;

    train = training_data;
    test = test_data;
    nama_kelas = class_name;
    features_server = features;

    console.log( train );
    console.log( test );
    console.log( features_server );
    console.log( nama_kelas );
    
    ProcessDecisionTree(train, test, features_server, nama_kelas);
    //res.end(JSON.stringify( training_data ));
});

function ProcessDecisionTree (train, test, fitur, nama_kelas) {
    const dt = new DecisionTree(train, nama_kelas, fitur);
    accuracy = dt.evaluate(test);
    tree_model = dt.toJSON();

    console.log("accuracy : " + accuracy);
    console.log("tree model : " + JSON.stringify(tree_model));
}

app.get("/get_result", (req,res) => {
    result = {
        akurasi: accuracy,
        pohon: tree_model,
        // header: tree_model.name,
        // vals: tree_model.vals
    };

    res.json(result);
});

function Predict(train, kelas, fitur, predicted_class){
    const dt = new DecisionTree(train, kelas, fitur);

    let predict_result = dt.predict(predicted_class);
    console.log(predict_result);
    return predict_result;
}

app.post('/input_prediction', (req,res) => {
    const { warna, bentuk } = req.body;
    console.log("warna : " + warna);
    console.log("bentuk : " + bentuk);
    predicted_class = {
        color: warna,
        shape: bentuk
    };
    console.log(predicted_class);
});

app.get("/get_prediction", (req,res) => {
    const dt = new DecisionTree(train, nama_kelas, features_server);
    console.log("predicted class : " + predicted_class);
    let result = dt.predict(predicted_class);
    result = {
        prediction_result: result
    }
    res.json(result);
});


//listen
app.listen(4000, () => {
    console.log("Backend Is Listening to Port 4000")
});