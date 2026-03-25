from sqlalchemy import Column, String, Integer, Date
from app.core.database import Base
import uuid

class Trend(Base):
    __tablename__ = "trends"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tag = Column(String, nullable=False)
    category = Column(String, nullable=False)
    count = Column(Integer, default=0)
    source = Column(String)
    recorded_at = Column(Date)