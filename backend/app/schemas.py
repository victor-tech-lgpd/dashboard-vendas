# backend/app/schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Schema base com os campos comuns
class SaleBase(BaseModel):
    product_name: str
    quantity: int
    unit_price: float
    description: Optional[str] = None

# Schema para criar uma nova venda (herda de SaleBase)
class SaleCreate(SaleBase):
    pass

# Schema para ler uma venda (usado como resposta da API)
# ESTA É A CLASSE QUE ESTAVA FALTANDO OU INCORRETA
class Sale(SaleBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Schema para os dados dos KPIs
class KpiData(BaseModel):
    total_revenue: float = 0
    total_sales: int = 0
    average_ticket: float = 0
    total_quantity_sold: int = 0

    class Config:
        from_attributes = True