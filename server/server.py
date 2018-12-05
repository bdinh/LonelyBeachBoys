from flask import Flask, jsonify, request, make_response
import os
import pandas as pd
from sklearn.model_selection import train_test_split, KFold
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import GridSearchCV
from sklearn.neural_network import MLPClassifier

# import data and drop extra columns
features = pd.read_csv("data/modeling_features.csv")
labels = pd.read_csv("data/modeling_outcome.csv")
features = features.drop(["Unnamed: 0"], axis=1)
labels = labels.drop(["Unnamed: 0"], axis=1)

# make the outcome categorical, incrementing from 0 in 0.25 steps
labels["rating_value"] = [str(round(i * 4) / 4) for i in labels["rating_value"]]

# perform a test train split, and generate folds for cross validation
train_features, test_features, train_outcome, test_outcome = train_test_split(
    features,
    labels["rating_value"],
    test_size=0.25,
    random_state=42
)
folds = KFold(n_splits=10, shuffle=True, random_state=42)

# create the pipeline
pipeline = make_pipeline(
    MinMaxScaler(),
    MLPClassifier()
)
# set params
pipeline_params = {
    "mlpclassifier__hidden_layer_sizes": [100],
    "mlpclassifier__activation": ["relu"],
    "mlpclassifier__solver": ["adam"],
    "mlpclassifier__alpha": [0.001],
    "mlpclassifier__learning_rate": ["constant"],
    "mlpclassifier__random_state": [42],
    "mlpclassifier__beta_1": [0.07],
    "mlpclassifier__beta_2": [0.999],
    "mlpclassifier__early_stopping": [False]
}
# perform grid search
model = GridSearchCV(pipeline, pipeline_params, cv=folds)
model.fit(train_features, train_outcome)
score = model.score(test_features, test_outcome)

# output score
print("model score:", score)
print("best params:", model.best_params_)

app = Flask(__name__)
addr = os.environ["ADDR"]
port = addr.split(":")[1]
host = addr.split(":")[0]

@app.route("/v1/beer", methods=["POST", "GET"])
def beer_handler():
    if request.method == "GET":
        print()
        return jsonify({"model_score": score})
    else:
        model_features = request.get_json()
        if model_features is None:
            return make_response("Request Body Cannot Be Empty", 404)
        df_row = pd.DataFrame(model_features, index=[0])
        predicted_popularity = float(model.predict(df_row)[0])
        return jsonify({"predicted_popularity": predicted_popularity, "feature_row": model_features})



if __name__ == "__main__":
    app.run(debug=False, host=host, port=port)
    # app.run(debug=True, host="127.0.0.1", port=5000)

