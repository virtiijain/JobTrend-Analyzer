from fastapi import FastAPI
from app.core.database import engine
from app.models import trend
from app.api.trends import router

trend.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TechTrendly API")
app.include_router(router, prefix="/api")

@app.get("/")
def home():
    return {"message": "TechTrendly API running"}