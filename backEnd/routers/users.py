from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from schemas.userSchema import UserCreate
from models.users import User
from db.database import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/add")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        print("Email already registered")
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(email=user.email, password=user.password, name=user.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user": {"email": new_user.email}}