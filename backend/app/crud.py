# backend/app/crud.py
from sqlalchemy.orm import Session
from sqlalchemy import func # Importe a função func
from . import models, schemas
from datetime import datetime
from typing import Optional

# ... (outras funções crud) ...

# ADICIONE ESTA NOVA FUNÇÃO NO FINAL DO ARQUIVO
def get_kpi_data(db: Session, start_date: Optional[datetime], end_date: Optional[datetime]):
    # Query base para os cálculos
    query = db.query(
        func.sum(models.Sale.unit_price * models.Sale.quantity).label("total_revenue"),
        func.count(models.Sale.id).label("total_sales"),
        func.sum(models.Sale.quantity).label("total_quantity_sold")
    )

    # Aplica os filtros de data se eles existirem
    if start_date:
        query = query.filter(models.Sale.created_at >= start_date)
    if end_date:
        query = query.filter(models.Sale.created_at <= end_date)

    result = query.one()

    # Extrai os resultados, tratando o caso de não haver vendas (None)
    total_revenue = result.total_revenue or 0
    total_sales = result.total_sales or 0
    total_quantity_sold = result.total_quantity_sold or 0

    # Calcula o ticket médio de forma segura
    average_ticket = (total_revenue / total_sales) if total_sales > 0 else 0

    return {
        "total_revenue": total_revenue,
        "total_sales": total_sales,
        "average_ticket": average_ticket,
        "total_quantity_sold": total_quantity_sold,
    }