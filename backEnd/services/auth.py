from schemas.userSchema import UserCreate
from sqlalchemy.orm import Session
from models.users import User

def check_email_exists(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()

def check_password_correct(email: str, password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if user and user.password == password:
        return True
    return False



def check_login(email: str, password: str, db: Session):
    if not check_email_exists(email, db) or not check_password_correct(email, password, db):
        return False
    user = db.query(User).filter(User.email == email).first()
    return {
        "name":user.name,
        "email":user.email,
        "password":user.password
    }


def create_user(user: UserCreate, db: Session):  
    new_user = User(email=user.email, password=user.password, name=user.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return user