from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from services import auth

from schemas.userSchema import UserCreate,UserLogin
from db.database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)




@router.post("/signup")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    check = auth.check_email_exists(user.email, db)
    if check:
        raise HTTPException(status_code=400, detail="Email already registered")
    response = auth.create_user(user, db)
    return response
# {"message": "User created successfully", "user": {"email": user.email}}


@router.post("/login")
def login(user: UserLogin , db: Session = Depends(get_db)):
    check = auth.check_login(user.email, user.password, db)
    if not check:
        raise HTTPException(status_code=400, detail="Email or Password Incorrect")
    return check
# {"message": "Login Successful"}