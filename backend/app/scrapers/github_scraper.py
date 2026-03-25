import requests
from datetime import date
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.trend import Trend

LANGUAGES = [
    "python", "javascript", "typescript", "rust", 
    "go", "kotlin", "swift", "java", "cpp"
]

def fetch_github_trends():
    db: Session = SessionLocal()
    
    for lang in LANGUAGES:
        url = f"https://api.github.com/search/repositories"
        params = {
            "q": f"language:{lang} stars:>100",
            "sort": "stars",
            "per_page": 10
        }
        headers = {"Accept": "application/vnd.github.v3+json"}
        
        response = requests.get(url, params=params, headers=headers)
        data = response.json()
        
        count = data.get("total_count", 0)
        
        # DB mein save karo
        trend = Trend(
            tag=lang,
            category="language",
            count=count,
            source="github",
            recorded_at=date.today()
        )
        db.add(trend)
        print(f"✅ {lang}: {count} repos")
    
    db.commit()
    db.close()
    print("🎉 GitHub scraping done!")

if __name__ == "__main__":
    fetch_github_trends()