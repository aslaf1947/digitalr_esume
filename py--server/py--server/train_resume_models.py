import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor
import joblib

df = pd.read_csv("historical_resumes.csv")
print(f"Loaded {len(df)} resumes for training.")

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = [model.encode(text) for text in df['resume_text']]
X_train = np.vstack(embeddings)
y_train = df['score'].values

lr_model = LinearRegression().fit(X_train, y_train)
knn_model = KNeighborsRegressor(n_neighbors=3).fit(X_train, y_train)

joblib.dump(lr_model, "lr_model.joblib")
joblib.dump(knn_model, "knn_model.joblib")
print("✅ Models trained and saved!")
