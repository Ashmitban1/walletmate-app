from schemas.userSchema import UserCreate
from sqlalchemy.orm import Session
from models.users import User
from db.database import get_db

def check_email_exists(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()

def check_password_correct(email: str, password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if user and user.password == password:
        return True
    return False

def check_login(email: str, password: str, db: Session):
    user = check_email_exists(email, db)
    if not user:
        return False
    return check_password_correct(email, password, db)

def create_user(user: UserCreate, db: Session):  
    new_user = User(email=user.email, password=user.password, name=user.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)