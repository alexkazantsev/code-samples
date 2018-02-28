package university

import (
	"cheetah/faculty"
	"github.com/jinzhu/gorm"
)

type University struct {
	gorm.Model
	Name      string            `sql:"not null" json:"name"`
	Location  string            `sql:"not null" json:"location"`
	Faculties faculty.Faculties `json:"faculties"` //one to many relation
}

type Universities []University
