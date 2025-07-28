# backend/app/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, get_db
from typing import List, Optional # Certifique-se que Optional está importado
from datetime import datetime
from dateutil.parser import parse

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/sales/", response_model=schemas.Sale)
async def create_sale(item: schemas.SaleCreate, db: Session = Depends(get_db)):
    return crud.create_sale(db=db, sale=item)

@app.get("/kpis/", response_model=schemas.KpiData)
def get_kpis(start_date: Optional[str] = None, end_date: Optional[str] = None, db: Session = Depends(get_db)):
    start_date_obj = parse(start_date) if start_date else None
    end_date_obj = parse(end_date) if end_date else None
    return crud.get_kpi_data(db, start_date=start_date_obj, end_date=end_date_obj)

@app.get("/sales/", response_model=List[schemas.Sale])
async def get_sales(start_date: Optional[str] = None, end_date: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Sale)
    if start_date:
        start_date_obj = parse(start_date)
        query = query.filter(models.Sale.created_at >= start_date_obj)
    if end_date:
        end_date_obj = parse(end_date)
        query = query.filter(models.Sale.created_at <= end_date_obj)
    return query.all()