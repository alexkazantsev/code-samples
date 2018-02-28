package teacher

import (
	"github.com/jinzhu/gorm"
	_ "github.com/michaeljs1990/val"
)

type Teacher struct {
	gorm.Model
	Firstname      string             	`sql:"not null" json:"first_name"`
	Lastname      string             	`sql:"not null" json:"last_name"`
}

type Teachers []Teacher

type TeacherResponseJSON struct {
	Firstname 	string					`json:"first_name"`
	Lastname 	string					`json:"last_name"`
}

type TeacherRequestJSON struct {
	Firstname  *string `json:"first_name"`
	Lastname  *string `json:"last_name"`
}
