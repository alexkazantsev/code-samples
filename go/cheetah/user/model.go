package user

import (
	"cheetah/account"
	"cheetah/app_utils"
	"fmt"
	"github.com/Sirupsen/logrus"
	"github.com/jinzhu/gorm"
	"strconv"
)

/**
 * Get users.
 */
func Fetch(conn *gorm.DB, id ...string) (*gorm.DB, error) {
	if len(id) > 0 {
		user_id, err := strconv.ParseUint(id[0], 10, 64)
		if err != nil {
			fmt.Println("ERROR USER ID PARSING", id[0])
			return nil, err
		} else {
			return conn.Where(gorm.Model{ID: uint(user_id)}).First(&User{}), nil
		}
	}
	var users Users
	return conn.Find(&users), nil
}

/**
 * Get user by vk id.
 */
func FetchByVK(conn *gorm.DB, vk_id string) (*User, error){
	var user User
	err := conn.Joins("INNER JOIN account ON account.user_id = user.id").
		Where("account.vk_id = ?", vk_id).
		Preload("Account").
		Preload("University").
		Preload("Faculty").
		Preload("Department").
		Preload("Group").
		Find(&user).Error
	if err != nil {
		logrus.Infoln("USER ERROR -->> ", err)
		return nil, error(err)
	}
	logrus.Infoln("OUTPUT USER -->> ", user.Account)
	return &user, nil

}


func FetchByEmail(conn *gorm.DB, email string) (*User, error) {
	var user User
	err := conn.Joins("INNER JOIN account ON account.user_id = user.id").
		Where("account.email = ?", email).
		Preload("Account").
		Preload("University").
		Preload("Faculty").
		Preload("Department").
		Preload("Group").
		Find(&user).Error
	if err != nil {
		logrus.Infoln("USER ERROR -->> ", err)
		return nil, error(err)
	}
	logrus.Infoln("OUTPUT USER -->> ", user.Account)
	return &user, nil
}

func Register(conn *gorm.DB, userData *UserRequestJSON) (*UserResponseJSON, error) {
	newUser := User{
		FirstName:    *userData.FirstName,
		LastName:     *userData.LastName,
		UniversityID: *userData.University,
		FacultyID:    *userData.Faculty,
		DepartmentID: *userData.Department,
		GroupID:      *userData.Group,
		Account: account.Account{
			Email:    *userData.Email,
			Password: app_utils.CryptPass(*userData.Password),
		},
	}

	err := conn.Create(&newUser).
		Preload("University").
		Preload("Faculty").
		Preload("Department").
		Preload("Group").
		Preload("Account").
		Find(&newUser).Error
	if err != nil {
		return nil, error(err)
	}

	userJson := UserResponseJSON{
		FirstName:  newUser.FirstName,
		LastName:   newUser.LastName,
		Email:      newUser.Account.Email,
		University: newUser.University,
		Faculty:    newUser.Faculty,
		Department: newUser.Department,
		Group:      newUser.Group,
	}

	return &userJson, nil

}

func Create(conn *gorm.DB, data *User) *gorm.DB {
	return conn.Create(&data).Find(&data)
}
