from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.trend import Trend

router = APIRouter()

@router.get("/trends")
def get_trends(db: Session = Depends(get_db)):
    trends = db.query(Trend).all()
    return trends

@router.post("/trends")
def create_trend(tag: str, category: str, source: str, db: Session = Depends(get_db)):
    trend = Trend(tag=tag, category=category, source=source, count=1)
    db.add(trend)
    db.commit()
    db.refresh(trend)
    return trend