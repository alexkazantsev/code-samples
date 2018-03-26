package user

import (
	"cheetah/account"
	"cheetah/department"
	"cheetah/faculty"
	"cheetah/group"
	"cheetah/university"

	"github.com/jinzhu/gorm"
	_ "github.com/michaeljs1990/val"
)

type User struct {
	gorm.Model
	FirstName    string                `sql:"not null" json:"first_name"`
	LastName     string                `sql:"not null" json:"last_name"`
	Account      account.Account       `json:"account"` //one to one relation
	Group        group.Group           `json:"group"`   //belongs to group with foreign key as GroupID
	GroupID      uint                  `json:"group_id"`
	Department   department.Department `json:"department"` //belongs to department
	DepartmentID uint                  `json:"department_id"`
	University   university.University `json:"university"` //belongs to university with foreign key as UniversityID
	UniversityID uint                  `json:"university_id"`
	Faculty      faculty.Faculty       `json:"faculty"` //belongs to faculty with foreign key as FacultyID
	FacultyID    uint                  `json:"faculty_id"`
	VkID         uint                  `json:"vk_id"`
}

type Users []User

type UserResponseJSON struct {
	FirstName  string                `json:"first_name"`
	LastName   string                `json:"last_name"`
	Email      string                `json:"email"`
	Group      group.Group           `json:"group"`
	Department department.Department `json:"department"`
	University university.University `json:"university"`
	Faculty    faculty.Faculty       `json:"faculty"`
	VkID       uint                  `json:"vk_id"`
}

type UserRequestJSON struct {
	FirstName  *string `json:"first_name" validate:"required|regex:^[A-Za-z]{3,18}"`
	LastName   *string `json:"last_name" validate:"required|regex:^[A-Za-z]{3,18}"`
	Email      *string `json:"email" validate:"required|email"`
	University *uint   `json:"university,string" validate:"required"`
	Faculty    *uint   `json:"faculty,string" validate:"required"`
	Department *uint   `json:"department,string" validate:"required"`
	Group      *uint   `json:"group,string" validate:"required"`
	Password   *string `json:"password" validate:"required|regex:^.{6,}$"`
	VkID       *uint   `json:"vk_id"`
}
